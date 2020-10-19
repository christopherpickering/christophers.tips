# Moving from MySQL to PostgreSQL on Mac

## Install Postgres with Brew

First intall postgres

```sh
brew install postgresql
```

Allow ps to auto start 

```sh
pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
```

## Create Userer and DB

### Open ps session

```sh
# if you need to exit at any time, press ctl+d, or \q
psql postgres
```

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
python manage.py dumpdata --all --natural --indent=4 > dbname.json
```

Import json to Postgres
```sh
python manage.py loaddata dbname.json --database=postgresql
```

Finally change the default database in settings.py to the postgress connection.

## Postgres Config

If you installed with homebrew, the config file will be here:
```sh
/usr/local/var/postgres
```