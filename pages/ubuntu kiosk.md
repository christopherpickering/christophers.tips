# Create a Basic Ubuntu Web Kiosk

### Install Latest UBUNTU

# Choose Option for Light Install

# Create user "kiosk"

Set auto login to true
Set user to have no password

sudo passwd -d 'kiosk'

# Create firefox startup script

```sh
nano ~/Desktop/firefox.sh

```

```sh
MOZ_USE_XINPUT2=1 /usr/bin/firefox
```

Change permissions to be able to run as non sudo
```sh
chmod 777 ~/Desktop/firefox.sh
```
Search start menu for startup applications.
Add ```~/Desktop/firefox.sh```


# Change Firefox settings
Change homepage to http://backoffice/

Turn off all homepage features
Install AutoFullscreen extension to put firefox in full screen mode when opened.


# Change PDF Settings
go to url about:config

search for pdf

change "cursorToolOnLoad" to 1
change "disablePageMode" to true
change "sidebarViewOnLoad" to 4

# Turn on On Screen Keybaord
Settings > Universal Access > Screen Keyboard > On

# Turn off Screen Saver
Settings > Power > Blank Screen > Never
Automatic Suspend > Off
Bluetooth Off
