# Create a Basic Ubuntu Web Kiosk

These steps are used on a MINIX PC with windows 10 pro installed.

## Install Latest UBUNTU

[Download](https://www.ubuntu.com/download/desktop) Ubuntu and put the image onto a thumb drive. [Etcher](https://www.balena.io/etcher/) is an easy program to use.

### Next we need to go into the BIOS and boot from the new USB. 

1. Open Settings
2. Choose Update and Security
3. Choose Recovery from the left menu
4. In the Advanced startup section click Restart Now
5. After reboot click Troubleshoot
6. Click Advanced Options
7. Click UEFI Firmware Settings
8. Click Restart

### Select USB to boot from

While in the BIOS we will change the PC to auto boot when there is a power failure and then to boot from the USB to install UBUNTU.

1. Navigate to the Advanced tab
2. Choose option for MINIX Feature Configuration
3. Change option for AC Power On to Always On
4. Navigate to the Save & Exit tab
5. Change Boot Override to your USB device

### Install UBUNTU

1. Select Install UBUNTU from the menu
2. After selecting language, select the option for Minimal installation
3. Select option to Erase disk and insatll Ubuntu
4. Create an Admin user with pass you will not forget


## Setup Kiosk

### Create User

Next create the kiosk user account in terminal. The account will be setup with no password and auto login.

```sh
# create user
sudo adduser kiosk

# set no pass
sudo passwd -d 'kiosk'

# set auto login. Edit conf file. 
# Remove comments on the auto login section and add user. 
sudo nano /etc/gdm3/custom.conf

# section should look like this:
# Enabling automatic login
AutomaticLoginEnable = True
AutomaticLogin = kiosk

# next allow kiosk to sudo without a pass
sudo visudo
# add this to the end of file
kiosk ALL=(ALL) NOPASSWD: ALL

# fianlly reboot as kiosk user for remaining changes. 
# if everything worked the user should auto login.
sudo reboot
```

### If more BIOS Changes are needed .. Change Grub Settings

We will change the grub settings to show the grub menu on boot so that we can access BIOS by pressing F2 when booting if needed.

In terminal:

```sh
# open grub settings
sudo nano /etc/default/grub

# add a # to comment out the line "GRUB_TIMEOUT_STYLE=hidden"

# finally, run grub update
sudo update-grub
```

### Reboot Every Night
We would like the PC to reboot daily. This must be done on the admin account.

Add an entry to crontab:

```sh
sudo crontab -e

# every day at 2 am
0 2 * * * /sbin/shutdown -r now 

# save and then restart cron
sudo service cron restart
```

## Enable Remote Access

Because we installed the basic UBUNTU the package we need was not installed. Install now.

```sh
sudo apt install -y vino
```

These steps must be done on the kiosk user, not admin.

1. Settings > Sharing > Turn On
2. Turn on screen sharing
3. Add a password

Stop encryption
```sh
sudo gsettings set org.gnome.Vino require-encryption false
``` 

Other possible helps
```sh
sudo apt-get install dconf-tools
```

These steps must be done as the kiosk user, not admin.

Open dconf. Navigate to org > gnome > desktop > remote-access
* Turnn of require encription
* chang auth method to vnc

Restart for changes to work.

## Create firefox startup script

This piece of the setup is done in the kiosk user section.

### Create Firefox Startup Script

In Termiinal:

```sh
nano ~/Desktop/firefox.sh

# add this to the file and save. This will enable gestures in firefox.
# sleep for 30 seconds so internet can connect
sleep 30s
MOZ_USE_XINPUT2=1 /usr/bin/firefox
```

Change permissions to script to be able to run as non sudo

```sh
chmod 777 ~/Desktop/firefox.sh
```

Make the script run on login. It can either be added to "Startup Applications" user interface.
Search start menu for startup applications and add ```~/Desktop/firefox.sh``` as the program to run.

## Change Firefox settings

### Change diplay settings
* Change homepage to http://backoffice/
* Turn off all homepage features
* Install AutoFullscreen extension to put firefox in full screen mode when opened.

### Change PDF Settings

Navigate go to url "about:config" to open settings.

Search for pdf

change "cursorToolOnLoad" to 1

change "disablePageMode" to true

change "sidebarViewOnLoad" to 4

### Do not reopen tabs on crash

When firefox starts we always want the home page, do not attempt to reopen any tabs.

Seach for session. change browser.sessionstore.resume_from_crash to False.

## Other Settings

### Turn on On Screen Keybaord
Settings > Universal Access > Screen Keyboard > On

### Turn off Screen Saver
Settings > Power > Blank Screen > Never

Automatic Suspend > Off

Bluetooth Off

### Turn off Notifications
Settings > Notifications > Off




