# Setup Gitea Code Repositories

Special thanks to [Bryan Gilbert](https://bryangilbert.com/post/devops/how-to-setup-gitea-ubuntu/), whos tutorial this writeup is based on.


# Create Git User

Login to the server. In this case we are using Ubuntu 18.

Create a user account "git" which will be used by gitea. There will be no password, but will have a home directory.

```sh
sudo adduser --system --shell /bin/bash --group --disabled-password --home /home/git git

```

# Create Database


Install postgresql.

``` sh
sudo apt install postgresql
```

## Create DB User

Start sql session.

```sh
sudo su postgres
psql
```

Create user and database. 
```sh
CREATE USER gitea WITH PASSWORD '<password>';
CREATE DATABASE gitea OWNER gitea;
# exit postgres.
\q
```
## Tune the DB

We will make a few tweaks to postgres config.

Open the conf file.

```sh
sudo nano /etc/postgresql/10/main/postgresql.conf
```

Set shared_buffers to 25% of total ram. Example: with 4gb ram:

```sh
shared_buffers= 1024MB

# other settings:
max_connections= 500
track_counts= on
autovacuum= on
work_mem= 4MB
```
Restart db.

```sh
sudo service postgresql restart
```


# Install Gitea

Next, we can install Gitea. You can get the current version number from [gitea](https://github.com/go-gitea/gitea/releases).

``` sh
# change user to git
sudo su git

# make gitea directory
cd /home/git && mkdir gitea && cd gitea

# copy in the latest version of gitea
wget -O gitea https://dl.gitea.io/gitea/1.8.2/gitea-1.8.2-linux-amd64

# change permissions
chmod +x gitea

# exit git account
exit
```

The gitea server can be run manually for testing if needed. The installation can be finished at this point as well, but we will wait until nginx is running first.

```sh
./gitea web
```

# Setup Gitea Service 

Next a service needs to be created to keep Gitea running, and restart it when the server restarts.

```sh
sudo nano /etc/systemd/system/gitea.service
```

Enter the service information. 

```sh
[Unit]
Description=Gitea (Git with a cup of tea)
After=syslog.target
After=network.target
After=postgresql.service

[Service]
RestartSec=2s
Type=simple
User=git
Group=git
WorkingDirectory=/home/git/gitea
ExecStart=/home/git/gitea/gitea web
Restart=always
Environment=USER=git HOME=/home/git

[Install]
WantedBy=multi-user.target
```

Enable and start the service.

```sh
sudo systemctl enable gitea.service
sudo systemctl start gitea.service
```

# Setup Nginx

Install.

```sh
sudo apt install nginx
```

Create the Nginx site.

```sh
sudo nano /etc/nginx/sites-enabled/gitea
```

Enter server information.

```sh
server {
    listen 80;
    server_name <your-domain or IP address>;

    location / {
        proxy_pass http://localhost:3000;
    }

    proxy_set_header X-Real-IP $remote_addr;
}
```

Finally, remove the default Nginx site and reload Nginx.

```sh
sudo rm /etc/nginx/sites-enabled/default
sudo service nginx reload
```

Change the upload limit size in Nginx.

```sh
sudo nano /etc/nginx/nginx.conf
# change this line to the size you need. If line is not there, add to the http {} section.
client_max_body_size = 100M;
```

Restart Nginx.

```sh
service nginx restart
```

# Completed Installation

Now you can navigate to the website and complete installation. You will need to enter the db password, etc.


https://docs.gitea.io/en-us/customizing-gitea/