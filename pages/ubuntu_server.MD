# How to setup an Ubuntu Server
## Running Django; MySQL; Nginx; Gunicorn

If you will be running this as a virtual test server you can install ubuntu in a virtual box. 

Install virtualbox from https://www.virtualbox.org​

Download Ubuntu server ISO. https://www.ubuntu.com/download/server 

Create a new virtual machine in virtualbox. On the initial startup select the ubuntu ISO.

Don't forget to save the username and password for your nex machine, they come in handy. If you forget the pass you can [reset it](https://askubuntu.com/questions/24006/how-do-i-reset-a-lost-administrative-password).

Make sure the network connection to the new machine is bridged. Restart the VM. 

```sh
$ sudo reboot
```

## Create User and Working Directory

### Create Development User

You may want to create another generic user acount for anyone doing code work to use.

```sh
sudo adduser <new username>
# enter pass and other info

# add to sudo group
sudo usermod -aG sudo <new username>

# if you want to switch to the new user
su - <new username>
```

### Create the development directory

```sh
mkdir websites
cd websites
mkdir testsite
```

### Pull Your Code From GIT Repository

Update Git settings and initialize a git repository for your project.

```sh
git config --global user.name "user name"
git config --global user.email "email address"
cd testsite
git init
git remote add origin https://github.com/christopherpickering/django-test.git
git pull
```

Settings.py file is not a part of the repository. You can make the file and copy in from your host machine. If it is a local virtual machine it can help to set the allowed hosts to '\*' if you have dynamic hosts.

```sh
sudo scp 'username'@'machost':~/Documents/Projects/django-project/testsite/testsite/settings.py /home/websites/testsite/testsite/settings.py
```

## Install PIP and Virtualenv Tools

We will be doing all work with a virtual environment. First we need to add the repositorys for pip, install pip, install venv, create a venv, and then install any packages we need.

```sh
sudo apt-get install software-properties-common
sudo apt-add-repository universe
sudo apt-get update
​
sudo apt-get install python3-pip
# create pip alias for pip3 to save time typing pip3..
sudo pip3 install virtualenv

sudo virtualenv venv
source venv/bin/activate
# install any needed packages
sudo pip install <packages>

# check that you have ownership of the venv
ls -l
# if something got messed up with permissions and you don't own the venv, you can take ownership like this
sudo chown -R youruser:youruser venv
```

If you created a requirements.txt file in the development mac, you can use it here to install all the needed packages. Activate the virual env and then run this.

```sh
pip install -r requirements.txt
```

If pyodbc is needed try this.

```sh
sudo apt-get install unixodbc-dev

source venv/bin/activate
pip install pyodbc
```

## Install and Setup MySQL

### Install Python Package and Ubuntu Packages

```sh
# for python
source venv/bin/activate
pip install mysqlclient
deactivate

# for ubuntu
sudo apt update
sudo apt install mysql-server
sudo apt install libmysqlclient-dev -y
sudo apt install python-mysqldb
```

### Setup MySQL

[MySQL Docs](https://dev.mysql.com/doc/mysql-getting-started/en/)

Turn on MySQL and change settings so that is will auto start on reboot.

```sh
systemctl start mysql
systemctl enable mysql
# optional, for extra password security you can run this.
sudo mysql_secure_installation
```

Set a password for root sql user.

```sh
sudo mysql
# set a root password.. where password is your pass
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges
exit

# try to login with new pass to verify. 
mysql -u root -p
```

Finally, create the database you referenced in django's settings.py. 

```sql
 CREATE DATABASE my_database;
```

## Build database tables

Next we can create the database tables needed for your django project.

```sh
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
deactivate
```

## Setup ufw, Gunicorn, and NGINX

### Setup ufw

[ufw Docs](https://help.ubuntu.com/community/UFW)

First install the package

```sh
$ sudo apt-get install ufw
```

Setup correct port blocking.

```sh
sudo ufw default deny
# if you access the server through ssh, you might want to enable that traffic ;)
sudo ufw allow ssh
# if you need remote access to your sql database
sudo ufw allo MySQL
sudo ufw enable
sudo ufw allow 8800
```

### Setup Gunicorn

[Gunicorn Docs](http://docs.gunicorn.org/en/stable/settings.html)

Gunicorn is a python package and installed through the pip virtual environment.

```sh
source venv/bin/activate
pip install gunicorn
deactivate
```

Create gunicorn service information.

```sh
sudo nano /etc/systemd/system/gunicorn.service
```

Type in the following.

```sh
[Unit]
Description=gunicorn service
After=network.target
   
[Service]
User=username
Group=www-data
WorkingDirectory=/home/path/to/project/
ExecStart=/home/path/to/project/env/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/path/to/project/project.sock PROJECT.wsgi:application
   
[Install]
WantedBy=multi-user.target
```

Turn on Gunicorn service.

```sh
sudo systemctl enable gunicorn.service
sudo systemctl start gunicorn.service
sudo systemctl status gunicorn.service
​
# check any errors with
journalctl -u gunicorn
```

## Setup NGINX

[NGINX Docs](http://nginx.org/en/docs/)

Install NGINX
```sh
$ sudo apt-get install nginx ufw
```

First create a config file telling NGINX what sites are available. Run this, where prjoect is your project name. 

```sh
sudo nano /etc/nginx/sites-available/project

# add this to the file
# 1. port number
# 2. server ip or dns
# 3. turn off error logging for favicon
# 4. static location
#    this is setup so any path beginning with static will go here.
#    turn on autoindex if you want uses to be able to browse paths.
# 5. all other locations. path to sock must match Gunicorn's path. file is auto created.


server {
	listen 80;
	server_name ipaddress webaddresses;
	location = /favicon.icon {access_log off; log_not_found off;}

	root /home/path/to/project/project;

	location ~ ^/static/(.*)$ {
		autoindex off;
    }
       
    location / {
        include proxy_params;
        proxy_pass http://unix:/home/path/to/project/project.sock;
    }
}
```

Enable site with NGINX and text it.

```sh
# enable site
sudo ln -s /etc/nginx/sites-available/project /etc/nginx/sites-enabled
# test configuration
sudo nginx -t

# finally, restart nginx
sudo systemctl restart nginx
# check nginx status
systemctl status nginx.service
```

Allow NGINX to come througth the firewall.

```sh
sudo ufw delete allow 8800
sudo ufw allow 'Nginx Full'
```

Run 'sudo ifconfig' to get the ip address of the server. You can now navigate to that in a browser and should find your django application running.

## a few trouble shooting tips

```sh
# Check that your site is in the sites avialable list
sudo ls /etc/nginx/sites-available

# Check that your site is in the sites enabled list
sudo ls /etc/nginx/sites-enabled

# still not working? check the server name. try copying from the default.

# check the nginx error log?
sudo tail -30 /var/log/nginx/error.log
```

After making changes be sure and get stuff reloaded.

```sh
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl restart nginx
# or 
# for static file changes
sudo service nginx reload # or restart
# for dynamic file changes
sudo service gunicorn reload # or restart
```

## Setup LibreOffice for File Conversion

Whenever a .doc* is added to the /static/drawings folder I want it to convert to a pdf. There are two tools to do this job - LibreOffice and Inotifiy.

Inotify will watch the folder, and Libreoffice is used for headless conversion of .doc* to pdf. First install LibreOffice & Inotify.

### Install Tools

```sh
sudo apt install libreoffice
sudo apt install inotify-tools
sudo apt install libreoffice-java-common
sudo apt install default-jre
```

### Create Converter Script

The scrip will watch the directory we save it in, when a file is added it will run a LibreOffice command to convert to pdf. Watch out, spaces when setting variables cause an issue.

```sh
touch converter.sh
# make the script runable
sudo chmod 777 converter.sh
nano converter.sh
```

Add the following contents to the file and save. Try adding a doc to the directory to test.

```sh
#!/bin/bash

# set path to watch - in this case current directory.
DIR=$PWD

# watch for any changes
inotifywait -m -r -e moved_to -e create "$DIR" --format "%f" | while read f

do
    # print file name
    echo $f

    if [[ $f = *.doc* ]]; then
        # convert the file to pdf
        soffice --convert-to pdf $DIR/$f --headless
        # delete the doc
        rm $DIR/$f &
    fi
done
```

The script can then be run -
```sh
./converter.sh
```


### Make the Script AutoStart on Reboot

Finally, the script needs to be added to the startup stuff to auto run when the server restarts.

```sh
# open task manager as root
sudo crontab -e

# add this
@reboot /path/to/converter.sh
```





