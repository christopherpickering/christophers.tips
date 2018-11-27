import json
from pprint import pprint
import os
import jinja2
from pathlib import Path, PurePosixPath
import shutil
import markdown2
from datetime import datetime
import sys
from html5print import HTMLBeautifier
from csscompressor import compress
import hashlib
import jsmin

def build_page(page, path):

    page_update_date = (
        datetime.fromtimestamp(page.stat().st_mtime)
        .strftime("%B %d,%Y")
        .lstrip("0")
        .replace(" 0", " ")
    )

    with open(page, encoding="utf-8") as f:
        contents = markdown2.markdown(f.read(), extras=["fenced-code-blocks"])

    my_page = PurePosixPath(Path(page)).stem
    myfname = path.joinpath(my_page).with_suffix(".html")

    contents = templates.get_template("page.html").render(
        data,
        content=contents,
        js=js,
        css=css,
        update_date=page_update_date,
        page_name=page.stem,
    )
    
    # prettify
    contents = HTMLBeautifier.beautify(contents, 4)

    with myfname.open("w+", encoding="utf-8") as wf:
        wf.write(contents)


# set paths
base_dir = Path(__file__).parents[0]
static_root = base_dir / "static"
template_root = base_dir / "templates"
website_root = base_dir / "website"
pages_root = base_dir / "pages"

# for testing. pushes to different git repo
try:
    if sys.argv[1] == "test":
        website_root = base_dir / "test_site"
except:
    pass

# set templates
templates = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(template_root))
)

# create website directory if not existing
if not os.path.exists(website_root):
    os.makedirs(website_root)

# remove old build folders
shutil.rmtree(website_root / "pages", ignore_errors=True)
shutil.rmtree(website_root / "static", ignore_errors=True)

# build compressed CSS files
contents = ''

for file in static_root.joinpath("css").iterdir():
    if file.suffix == '.css' and file.name != 'all':

        contents += compress(open(file, 'r').read())


new_name = hashlib.md5(contents.encode('utf-8')).hexdigest()[-5:]
css_file = file.parents[0].joinpath('CACHE').joinpath(new_name).with_suffix(".css")
with css_file.open("w+", encoding="utf-8") as wf:
        wf.write(contents)

# build compressed JS files
contents = ''

for file in static_root.joinpath("js").iterdir():
    if file.suffix == '.js' and file.name != 'jquery':

        contents += compress(open(file, 'r').read())


new_name = hashlib.md5(contents.encode('utf-8')).hexdigest()[-5:]
js_file = file.parents[0].joinpath('CACHE').joinpath(new_name).with_suffix(".js")
with js_file.open("w+", encoding="utf-8") as wf:
        wf.write(contents)

# copy static files
shutil.copytree(static_root, website_root / "static")

# get static files
js = [
    website_root.joinpath("static","js","CACHE",css_file.name).with_suffix(".js").relative_to(website_root)
]
css = [
    website_root.joinpath("static","css","CACHE",css_file.name).with_suffix(".css").relative_to(website_root)
]
print(css)

# make pages dir
website_root.joinpath("pages").mkdir(exist_ok=True, parents=True)

# get book properties
with open("book.json") as f:
    data = json.load(f)

# build home page
build_page(base_dir / "index.md", website_root)

# build html pages
[
    build_page(child, website_root.joinpath("pages"))
    for child in Path(pages_root).iterdir()
    if PurePosixPath(Path(child)).stem != ".DS_Store"
]
