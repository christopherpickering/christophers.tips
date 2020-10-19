# Setting Up Cx_Oracle on Linux/Ubuntu

[Cx_Oracle Docs](https://cx-oracle.readthedocs.io/en/latest/installation.html)

## Download Instant Client

On host computer (Mac in this case) [download](https://www.oracle.com/technetwork/topics/linuxx86-64soft-092277.htm) the instant client basic and skd rpn's. Oracle changed the name on sdk's to devel.

oracle-instantclient18.3-basic-18.3.0.0.0-1.x86_64.rpm
oracle-instantclient18.3-devel-18.3.0.0.0-1.x86_64.rpm 

Put the files in a known directory. In my case I put the files in ~/Documents/Projects/Oracle

## Move Instant Client files to Server

Login to the server. Run this command to copy the full Oracle directory with both rpn's from the Mac host to the server.
On the Mac host don't forget to allow ssh connections. "System Preferences" > "Sharing" > "Remote Login" > "On"

```sh
sudo mkdir /home/Oracle
sudo scp -r 'username'@'machost':~/Documents/Projects/Oracle /home/
```

## Install Instant Client

Use alian to convert both rpn's to deb and install.

```sh
cd /home/Oracle
sudo apt-get install alien
sudo alien -i oracle-instantclient18.3-basic-18.3.0.0.0-1.x86_64.rpm
sudo alien -i oracle-instantclient18.3-devel-18.3.0.0.0-1.x86_64.rpm 
# uninstall alien if no longer needed
sudo apt-get purge --auto-remove alien
sudo rm -rf /home/Oracle
```

Install the packages needed on Ubuntu

```sh
sudo apt-get install libaio-dev
```

## Change Oracle Settings

Add oracle to the system path. 

```sh
sudo sh -c "echo /usr/lib/oracle/18.3/client64/lib > /etc/ld.so.conf.d/oracle-instantclient.conf"
sudo ldconfig
```

If you plan to use tnsnames.ora you can create the directory here. This is the default location for oracle.

```sh
sudo mkdir -p /usr/lib/oracle/18.3/client64/lib/network/admin

# copy tnsnames.ora from Mac host
sudo scp 'username'@'machost':/opt/oracle/instantclient_12_2/network/admin/tnsnames.ora /usr/lib/oracle/18.3/client64/lib/network/admin

```

Good luck :)