# How to Install CX_Oracle on Mac

[Official Docs](https://cx-oracle.readthedocs.io/en/latest/installation.html#install-using-github)

## Install Python
CX Oracle will not work with the mac bundled python. Install python with homebrew.

```sh
brew install python3
pip3 install virtualenv
```

Next install CX_Oracle for python. If it will be used in a virtual env, create that first.

```sh
# create virtual env
python3 -m virtualenv venv

# install cx oracle
pip install cx_Oracle
```

## Install Oracle Client

Download [Oracle Client basic.](http://www.oracle.com/technetwork/topics/intel-macsoft-096467.html)

Unzip it into the final directory.

```sh
sudo mkdir -p /opt/oracle
```

Move the unzipped download into that folder.

Add links to the /lib folder to make cx_oracle accessable.

```sh
mkdir ~/lib
ln -s /opt/oracle/instantclient_12_2/libclntsh.dylib.12.1 ~/lib/
```

Create the folder for the tnsnames.ora file.

```sh
mkdir -p /opt/oracle/instantclient_12_2/network/admin
```

