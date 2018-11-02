# Setting Up a Mac

## Sublime Text

### Useful packages

* Virtualenv
* HTMLBeautify
* SideBarEnhancements


## Terminal
Nice color scheme - http://color.smyck.org

## Safari DNS
https://cleanbrowsing.org/filters

## Keymapping

Somehow the home and end buttons on the apple keyboard don't go to the right place :)

This will fix it -

```sh
# create/edit the key bindings file
cd ~/Library
mkdir KeyBindings
sudo nano ~/Library/KeyBindings/DefaultKeyBinding.Dict

# paste in and save. You will need to restart your mac
{
    "\UF729"  = moveToBeginningOfParagraph:; // home
    "\UF72B"  = moveToEndOfParagraph:; // end
    "$\UF729" = moveToBeginningOfParagraphAndModifySelection:; // shift-home
    "$\UF72B" = moveToEndOfParagraphAndModifySelection:; // shift-end
    "^\UF729" = moveToBeginningOfDocument:; // ctrl-home
    "^\UF72B" = moveToEndOfDocument:; // ctrl-end
    "^$\UF729" = moveToBeginningOfDocumentAndModifySelection:; // ctrl-shift-home
    "^$\UF72B" = moveToEndOfDocumentAndModifySelection:; // ctrl-shift-end
    "$\U007F" = deleteWordBackward:;
}
```

More options can be found in [this gist](https://gist.github.com/christopherpickering/d646f1ba175336852e6c0d96bf243c21)

## Using Oracle EBS

### Install Firefox
Firefox 52 is the last version working with Oracle EBS Forms. Download it [here.](https://ftp.mozilla.org/pub/firefox/releases/52.9.0esr/)

### Install Java
The latest version of java is currently working well. You can download [here.](https://java.com/en/download/mac_download.jsp)

### Change settings in Java Control Panel
EBS Forms needs to be allowed as a safe site in Java.

1. On the mac open System Preferences > Java.
2. In Java Control Panel Security Tab > Edit Site List.
3. Add in the root of your ebs system. Example: http://ebs.domain.com

### First Use
On the first use when logging in in Firefox click "activate java" when prompted, and then allow popups when prompted.

## Terminal Alias

If you are typing the same phrase in terminal over and over and over it may be handy to create an alias name..

```sh
# edit bash profile
nano ~/.bash_profile

# add in the alias

# Aliases - remember no spaces at equals sign
alias act="source venv/bin/activate"
alias dact="deactivate"
alias ip="ifconfig | grep 'inet '"
alias gc="git add . git commit -m"
# save
# restart terminal or reload
source ~/.bash_profile
```