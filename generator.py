import json
from pprint import pprint
import os
import jinja2
from pathlib import Path, PurePosixPath
import shutil
import markdown2
from datetime import datetime

base_dir = Path(__file__).parents[0]

static_root = base_dir / 'static'
template_root = base_dir / 'templates'
website_root = base_dir / 'website'
pages_root = base_dir / 'pages'


templates = jinja2.Environment(
    loader=jinja2.FileSystemLoader(
    os.path.join(template_root))
)

#extensions = [
#        'markdown.extensions.meta',
#        'markdown.extensions.codehilite'
#    ]

#md = markdown.Markdown(extensions=extensions)

# remove old build
# next step, clone and only update changes
shutil.rmtree(website_root,ignore_errors=True)

# copy static files
shutil.copytree(static_root,website_root / 'static' ) 

js = [str(child.relative_to(website_root)) for child in website_root.joinpath('static').joinpath('js').iterdir()]
css = [str(child.relative_to(website_root)) for child in website_root.joinpath('static').joinpath('css').iterdir()]
fonts = [str(child.relative_to(website_root)) for child in website_root.joinpath('static').joinpath('fonts').iterdir()]


# make pages dir
website_root.joinpath('pages').mkdir(exist_ok=True, parents=True)


with open('book.json') as f:
    data = json.load(f)
#pprint(data)


pages = [child for child in Path(pages_root).iterdir() if PurePosixPath(Path(child)).stem != ".DS_Store"]

for page in pages:

    page_update_date = datetime.fromtimestamp(page.stat().st_mtime).strftime('%B %d,%Y %H:%M').lstrip("0").replace(" 0", " ")

    with open(page,encoding="utf-8") as f:
        #contents = md.convert(f.read())
        contents = markdown2.markdown(f.read(), extras=["fenced-code-blocks"])

    my_page = PurePosixPath(Path(page)).stem
    myfname = website_root.joinpath('pages').joinpath(my_page).with_suffix('.html')
    
    contents = templates.get_template('page.html').render(data, content = contents, js = js, css = css, update_date = page_update_date)

    with myfname.open('w+',encoding="utf-8") as wf:
        wf.write(contents)
        




