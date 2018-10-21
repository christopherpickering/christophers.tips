#How To Make This Site

This site can be made in a few simple steps -
* Install and create a Gitbook
* Customize Gitbook with a theme
* Push Gitbook to Github repo
* Register a domain with Google
* Add CNAME records

## Install and Create a Gitbook

If you do not have npm installed you will need to do that first.

```sh
brew intall npm
npm install -g gitbook-cli
gitbook update
```

Next create two directories, one for the Gitbook MD files and the other for the static site that will be generated. Gitbook will generate the static site inside the MD file but we'll need to move it to the other direcory when pushing to Github.

```sh
mkdir documentation
cd documentation
mkdir site
mkdir gitbook
```

Next both directories need to have a git repo intialized. Go to Github.com and make a repo for you MD files with any name you like. Make another repo named myusername.gitbook.io.

```sh
cd gitbook
git init
touch .gitignore

# you need to add _book to the .gitignore so you do not duplate on github
nano .gitignore
_book
# control + x then y to save

git remote add origin https//github.com/myusername/myrepo.git

cd ../site
git init
git clone https://github.com/christopherpickering/christopherpickering.github.io.git
mv christopherpickering.github.io/* .
rm -Rf christopherpickering.github.io
git remote add origin https://github.com/myusername/myusername.gitbook.io.git
```

Next create the gitbook.

```sh
gitbook init
```

[Gitbook Documentation] is available.

## Create a Gitbook Theme

By default any theming we do will extend the default. Create the following structure for themes.

```sh
cd gitbook
mkdir _layouts
cd _layouts
mkdir websites
cd websites
# any page tweaks will be here
touch page.html
# any page header tweaks will be here
touch header.html
```
Copy any theme sections you need to change from the [default theme].
[example theme 1]
[example theme 2]
[example theme 3]


## Push Gitbook to Github Repo

A few bash scripts are created to make doing updates simple.

- build.bash -this script will only build the static site locally. 
- push.bash -this script will push any changes in both repos to Github.
- build_and_push.bash -this script bill build the site and push udpates to Github.

You will most likely need to give yourself permission to run the scripts.

```sh
sudo chmod 700 build.bash
sudo chmod 700 push.bash
sudo chmod 700 build_and_push.bash
sudo chmod 700 pull.bash

./build_and_push.bash
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
# to build and push to github
./build_and_push.bash 'optonal commit message'

# to just build for testing
./build.bash

# to pull latest updates from github
./pull.bash

# to push latest updates to github
./push.bash 'optional commit message'
```

Nice! You will be able to see you site now at mysite.com!


[Gitbook Documentation]: <https://toolchain.gitbook.com>
[default theme]:<https://github.com/GitbookIO/theme-default/tree/master/_layouts>
[example theme 1]:<https://github.com/antonlegoo/gitbook-plugin-theme-gestalt>
[example theme 2]:<https://github.com/GitbookIO/theme-api>
[example theme 3]:<https://github.com/GitbookIO/theme-official>