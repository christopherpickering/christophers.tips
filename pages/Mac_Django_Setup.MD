# Setup a Mac for Django Web Development

## Create Python Working Environment

### Install Homebrew

```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install Python

```sh
# for python2
brew install python
# for python3
brew install python3
```

### Install PIP

```sh
#for python2. pip3 comes with python3.
sudo easy_install pip
```

### Install virtual environment

```sh
# for python2
pip install virtualenv
# for python 3
pip3 install virtualenv
```

### Setup Project Directory

First create the projects directory.

```sh
mkdir django-project
cd django-project
```

Create a virtual environment. The name venv can be whatver you like.

```sh
# for python2
virtualenv venv
# for python3
virtualenv -p python3 venv
```

Active virtual environment

```sh
source venv/bin/activate
```

Install Django and other needed packages

```sh
pip install django
pip install <packages>
```

To get out of venv

```sh
deactivate
```

## Create Django Site

Activate virtual environment

```sh
source venv/bin/activate
```

Create Django project

```sh
django-admin startproject testsite
```

Create Django app

```sh
cd testsite
python manage.py startapp myapp
```

To run code on mac. 

```sh
python manage.py runserver
```

Go to http://127.0.0.1:8000/ to see code in action.

## Install Mysql

Get mysql from Brew

```sh
brew install mysql
```

Install the components for python.

```sh
source venv/bin/activate
pip install mysqlclient
```

Turn on mysql with brew

```sh
brew services start mysql
```

Create mysql user.

```sh
mysqladmin -u root password 'yourpassword'
```

Access mysql through the command line to create your database.

```sh
mysql -u root -p
```

Create database

```sql
CREATE DATABASE my_database;
use my_database;
-- show tables
show tables;
-- show databases
show databases;
```

Back to the virtual environment, we need to create all the needed project tables. Run:

```sh
python manage.py makemigrations
```

Resolve any errors... here would be a good place to use requirements.txt file :)

```sh
python manage.py migrate
```

## Import MySQL Database Fron Server

### Dump the Dababase on the server.
Login to the server, navigate to where you want to put the dump. Run this.

```sh
mysqldump -u root -p --opt databasename > databasename.sql
```

### Copy the Database to Your New Intall

Next, on your new install (Mac or other server) you can pull in that database.

```sh
# for files
# sudo scp 'user'@'server':path/to/file.txt /path/on/host
# for folders
# sudo scp -r 'user'@'server':path/to/folder /path/on/host

sudo scp 'admin'@'server':~/database.sql ~/Documents/Projects/django-project/
```

### Import the Database

Finally the database can be imported on the new install. You must have already created the database in mysql.

```sh
mysql -u root -p hostdatabasename < databasename.sql
```

## Setup Static Files on Development Machine

Replace the line with "STATIC_ROOT" in settings.py with

```python
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)
```

Add the following snippet to the end of your urls.py file

```python
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
import settings
if settings.DEBUG == True:
    urlpatterns += staticfiles_urlpatterns()
```

# Save project PIP requirements

Activate the virtual environment and run this to create a listing of required modules.
```sh
pip freeze > requirements.txt
```

# Put Project on Github

Create git. Don't forget to update .gitignore!

```sh
$ git init
$ touch .gitignore
$ git add .
$ git status
$ git commit -m 'initial commit'
$ git remote add origin https://github.com/username/reponame.git
$ git push -u origin master
```