# How To Make This Site

This site can be made in a few simple steps -
* Setup the project
* Add content
* Register a domain with Google
* Add CNAME records

### Clone this project

Clone the project

```sh
git clone https://github.com/christopherpickering/christophers.tips.git
```

### Create a virtual environment

```sh
# rename project
mv 'christophers.tips' 'myproject'
cd myproject
virtualenv venv

# activate
source venv/bin/activate

# install packages
pip install jinja2
pip install markdown2
pip install pigments
pip install html5print
pip install csscompressor
```

### Make a directory for the website to generate into

```sh
mkdir website
```

### Add a git repo to your project

```sh
# one for the markdown
git init 
git remote add origin /path/to/remote

cd website
git init
git remote add origin /path/to/remote

```

## Add content

First, update the book.json file to your site information.

The home page is top level in the directory - index.md. Any other page for the site is in the pages/ directory.

After adding a new page the book.json file needs to be updated to include the new page in the menu.

When you are ready to publish your content, be sure the virtual environment is active. Then run the update script.

```sh
./build.bash
```

## Register a Domain With Google

Navigate to [domains.google.com](domains.google.com) and register a domain. Got to the DNS tab and add in the CNAME information.

![CNAME](/static/img/make_this_site-CNAME.png)

## Add CNAME Records to your project

```sh
cd ../site
touch CNAME
nano CNAME
```

Add two lines to the CNAME file

```
mysite.com
www.mysite.com
```

Finally, build and push the site.

```sh
./build.bash

bash build.bash
```

Nice! You will be able to see you site now at mysite.com!
