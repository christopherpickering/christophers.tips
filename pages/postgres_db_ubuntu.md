# Migrating from MySQL to Postgres on Ubuntu Server

## Install Postgres
```sh
sudo apt install postgresql postgresql-contrib
```

Set ps to run on startup
```sh
sudo update-rc.d postgresql enable
```

Next start a postgres session
```sh
sudo -u postgres psql
```
## Create Userer and DB

### Create a user

```sql
CREATE ROLE username WITH LOGIN PASSWORD 'password' ;
```

### Add permissions to user
```sql
ALTER ROLE username CREATEDB;
```

### Create a Database

```sql
CREATE DATABASE databasename;
```
### Add Authorized Users to Database

```sql
GRANT ALL PRIVILEGES ON DATABASE databasename TO username;
```

## Navigation


```sql
# List all database
\list

# Connect to database
\connect databasename

# List all tables
\dt
```

## Django Setup

First intall the postgres helper

```sh
pip install psycopg2-binary
```

Next, add the database to settings.py
```python
	,
    'postgresql': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'bdname',
        'USER': 'username',
        'PASSWORD': 'pass',
        'HOST': '127.0.0.1',
        'PORT': '',
    } 
```

Ensure migrations are up to date

```sh
python manage.py makemigrations
python manage.py migrate
```

Migrate settings to the new database and ensure tables are clear for import.
```sh
python manage.py migrate --database=posgresql
python manage.py sqlflush --database=postgresql
```

Export MySQL database to json.
```sh
python manage.py dumpdata --all --natural-primary --indent=4 > dbname.json
```

Import json to Postgres
```sh
python manage.py loaddata dbname.json --database=postgresql
```

Finally change the default database in settings.py to the postgress connection.

## Tips

### Restarting Postgres
```sh
sudo service postgresql restart
```

### Tuning

Edit conf file. You can start a session with postgres and run `SHOW config_file;` to see its location.

```sh
sudo nano /etc/postgresql/10/main/postgresql.conf
```

Set shared_buffers to 25% of total ram. Example: with 4gb ram:
```sh
shared_buffers = 1024MB
```