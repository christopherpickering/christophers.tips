# Getting Started

## Setup Git
```sh
git config user.name "Firstname Lastname"
git config user.email "email@email.com"
```

Initialize a get repo

```bash
git init
```

Create a .gitignore file to keep unneeded or confidential information from the repository.

```bash
touch .gitignore
```

Alternativly you can pre-create one here https://www.gitignore.io, or copy and past into the .gitignore.
___

# Add Content

## From GitHub

If the project already exists on GitHub and you plan to contribute it can be pulled.

```bash
git remote add origin https://github.com/username/project_name.git
git pull
```

To take a copy of the code for your own use

```bash
git clone https://github.com/username/project_name.git
```

## Create Branch

Run this command to get a list of branches and the current branch.

```bash
git branch 
```

To create a new branch
```bash
git branch <my_new_branch>
```

To change current working branch

```bash
git checkout <my_branch>
```

Create the branch from GitHub locally and switch to it

```bash
git checkout -b <my_branch>
```

Update a branch if the remote has changed

```bash
git fetch origin
```

Merge a branch back to master

```bash
git checkout master
git merge <my_branch>
```

To delete a branch

```bash
git branch -d 
```

To reset a branch to master

```sh
git reset --hard master
```

Want to get a file from another branch? Checkout the branch you want to copy the file(s) too. Then checkout the files from the source branch. Don't forget to commit when finished adding files.

```bash
git checkout <destination_branch>
git checkout <source_branch> <paths>
git commit -a -m "added a couple files from the other branch"
```

# Commit Code

## To Git

Run these commands to commit latest changes.

```bash
git add .
git commit -m 'comment about latest changes'
```

Or more condensed

```bash
git commit -a -m 'comment about latest changes'
```

## To GitHub

Add GitHub as a remote

```bash
git remote add origin https://github.com/username/project_name.git
```

If you want to change remote or had a spelling mistake (opps)

```bash
git remote rm origin
git remote add origin https://github.com/username/project_name.git

# to see what the remote is... incase you forgot :)
git remote -v
```
Push to remote

```bash
git push origin <branch name>
# if you need to force the update..
git push origin <branch name> --force
```

## Removing files that are in .gitignore

To see files that are not excluded by .gitignore

```bash
git ls-files -ci --exclude-standard
```

To remove excluded files from commit

```bash
git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached
```

Create Alias for this command so you can run 'git apply-gitignore' to fix any commit that missed updates in gitignore.

```bash
# change editor to nano
git config --global core.editor "nano"

# edit file
git config --global --edit

# add following text
[alias]
   apply-gitignore = !git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached 
```