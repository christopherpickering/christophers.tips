# How to Customize Gitea

## Language Changes

All language changes  for keywords are in the i18n files. In our case we need to change the app_desc on the home page.

1. Login to server
2. Change user to "git"  ```sh sudo su git```
3. Change directory to Gitea. ```sh cd /home/git/gitea/custom```
4. Make directory for change. ```mkdir options && cd options```
5. Make directory for languages. ```mkdir locale && cd locale```
6. Create language file. ```sh nano locale_en-US.ini```
7. Copy everything from the template source from Gitea.
8. Change any lines that you want changed.
9. Exit as git user. ```sh exit```
10. Restart Gitea service. ```sudo systemctl restart gitea```

## Edit Home Page

Navigate as git user to /home/git/gitea/custom

1. Make a directory for the templates. ```sh mkdir templates && cd templates```
2. Create template file & copy in source. ```sh nano home.tmpl```
3. Retart Gitea service after making changes. ```sudo systemctl restart gitea```

## Change Landing Page

Navigate as git user to /home/git/gitea/custom/conf

Edit app.ini

```sh
sudo nano app.ini

# add section:
[server]
LANDING_PAGE = explore
```

## Restart Gitea After Changes
The Gitea service must be restarted for any changed to take affect.

```sh
sudo systemctl restart gitea
```

or

```sh
sudo systemctl stop gitea
sudo systemctl start gitea
```