# Setting Up CMDER on Windows 10

Nothing quite compares to Iterm2 + Oh My Zsh, but on a Windows 10 this is the best I am able to find. Here's a screenshot:

<img src="/static/img/cmder.png" alt="Supplies" style="height: 300px;">


First download [Cmder](http://https://cmder.net/). Unzip into "Documents" and run cmder.exe. Answer any questions when prompted.

I find that the default cmder:cmd terminal works well. It can run git and basic linux commands. The only issue I have found is that daisy chaining alias is not permitted. 

## Configure

Click the top left icon and open settings.

General > Fonts > change size to 22
Startup > Tasks > {cmd:Cmder} > add a startup dir


## Set Up Aliases


The default terminal is cmd.exe. Aliases are added in the cmder/config/user_aliases.cmd.

For other terminals they will need to be added to other places.. for example ```nano ~/.bash_rc``` for git bash.

Here is a nice set to use:
```sh
gl=git log --oneline --all --graph --decorate  $*
ls=ls --show-control-chars -F --color $*
pwd=cd
clear=cls
history=cat -n "%CMDER_ROOT%\config\.history"
unalias=alias /d $1
vi=vim $*
cmderr=cd /d "%CMDER_ROOT%"
gs=git status
gc=git add . && git commit -m $*
gpu=git pull origin
gp=git push
gco=git checkout $*
gb=git branch
act=.\venv\scripts\activate
dact=deactivate
```

## Customize the UI

Bad practice, but I found it was easier to change the source 😇

In cmder/vendor/clink.lua make the following changes:

**After Line 38**
```lua
# after this line:
if cwd == nil then cwd = clink.get_cwd() end

# add a new match to trim the path down to two folders.
local customPath = cwd:match('(\\[^\\]*\\[^\\]*)$')
if customPath == nil then cwd = cwd else cwd = "~"..customPath end
```

**Lines 50 & 51**
```lua
# change the colors and prompt icon from 
local cmder_prompt = "\x1b[1;32;40m{cwd} {git}{hg}{svn} \n\x1b[1;39;40m{lamb} \x1b[0m"	
local lambda = "λ"
# to
local cmder_prompt = "\x1b[1;32;40m\x1b[0;35m{cwd} {git}{hg}{svn} \n\x1b[1;32;40m{lamb} \x1b[0m"
local lambda = "➜"
```

**Update git_prompt_filter() function**
This is the function that displays the git status.
```lua

local function git_prompt_filter()

    -- Colors for git status
    local colors = {
        clean = "\x1b[32;3m",
        dirty = "\x1b[33;3m",
        conflict = "\x1b[31;1m"
    }

    local icons = {
        clean = " ✔",
        dirty = " ✎",
        conflict = " ✘"
    }

    local git_dir = get_git_dir()
    if git_dir then
        -- if we're inside of git repo then try to detect current branch
        local branch = get_git_branch(git_dir)
        local color
        local icon
        if branch then
            -- Has branch => therefore it is a git folder, now figure out status
            local gitStatus = get_git_status()
            local gitConflict = get_git_conflict()

            color = colors.dirty
            icon = icons.dirty
            if gitStatus then
                color = colors.clean
                icon = icons.clean
            end

            if gitConflict then
                color = colors.conflict
                icon = icons.conflict
            end 

            clink.prompt.value = string.gsub(clink.prompt.value, "{git}", "\x1b[0m(\x1b[1m"..color..verbatim(branch).."\x1b[0m)\x1b[1m".. icon)
            return false
        end
    end

    -- No git present or not in git file
    clink.prompt.value = string.gsub(clink.prompt.value, "{git}", "")
    return false
end
```
