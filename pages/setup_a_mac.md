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
alias gc="git add . && git commit -m "
# save
# restart terminal or reload
source ~/.bash_profile
```

## UTF-8 Error when running python 3scripts from terminal, or through venv in Sublime

Edit your bash profiel to include these two lines -

```sh
# edit file
nano ~/.bash_profile

# add these lines and save.
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```

## Add Option to Finder Menu to Share Files with Outlook

1. Open Automator
2. Create new "Quick Action"
3. Change the first option for "Workflow recieves Current" to "files or folders"
4. Change application to "Finder"
5. Add an action - "Get Specified Finder Items"
6. Add an action - "Run Apple Script"
7. Paste the following Apple Script into the text box. Script from [here](https://answers.microsoft.com/en-us/mac/forum/macoffice2011-macstart/moving-the-automator-folder-doesnt-allow-1424-to/983a1074-34ee-40d6-b8ae-7f4d2ff45718)

```applescript
on run {input, parameters}
set SelectedItems to input
tell application "Finder" to set fileName to name of first item of SelectedItems
tell application "Microsoft Outlook"
    set newMessage to make new outgoing message with properties {subject:fileName}
    tell newMessage
        repeat with aFile in SelectedItems -- the loop through all selected items
            make new attachment with properties {file:aFile}
        end repeat
    end tell
    open newMessage
    get newMessage
end tell
return input
end run
```
![CNAME](/static/img/setup_a_mac-automator1.png)

8. Save script with a nice name. Now when you right click on a folder/file there will be an option to share with outlook!

![CNAME](/static/img/setup_a_mac-automator2.png)
