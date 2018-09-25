---
pinned: false
title: Setting up a macbook for front-end development
path: /blog/setting-up-a-macbook-for-front-end-development
date: 2018-09-25T12:13:00.808Z
image: /assets/ales-nesetril-734016-unsplash.jpg
---

Having just started a new job I've had to set up my new macbook just how I like it. While this process is still fresh in my mind I thought I'd chronicle what all my favourite settings and essential programs are here, creating a set-up guide so that I (and hopefully you too) can get started on a new machine even faster in the future!

# Update The System
First things first, you want to make sure that you have all of the latest system updates from Apple installed:

 > About This Mac > Software Update.

Update everything! You'll also want to make sure you're running the latest version of macOS.

# General system settings

## The Dock
I'm pretty particular about my Dock settings. Go into `system preferences` and select `Dock`. I hate how the Dock takes up so much screen space by default, so the first thing I like to do is make the size smaller, and turn on the `Automatically hide and show the Dock` option. Now the Dock won't take up so much space and your app windows can actually fill your screen!

The worst thing about hiding the dock is the extensive delay between hovering your cursor at the bottom of your screen and the Dock actually popping up. Luckily it's really simple to remove this delay, just open your terminal and enter the following command:

```
defaults write com.apple.Dock autohide-delay -float 0; killall Dock
```

While in the `Dock` settings I also like to add a bit of magnification to the icons (it makes it easier to select what you want when the dock is hidden), then I turn off the annoyingly slow opening animations.

###### Dock Settings
* Smaller Icons (about 1/4)
* Automatically hide and show the Dock
* Add maginification (about 3/4)
* Don't animate opening applications
* Minimize windows into application icon

## The Keyboard
The next thing I like to do is go into the `Keyboard` settings and set maximum key repeat and minimum delay, this makes navigating around a text editor with arrow keys much faster. 

###### Keyboard Settings
* Max repeat speed and min delay

## The Trackpad
In the `Trackpad` settings I turn on tap to click, remove three finger drag, and turn on the `app exposé` gesture. I'm a big fan of using gestures to navigate and switch between windows, so if you're not familiar with them I recommend trying them out!

###### Trackpad Settings
* Tap to click
* Remove 3 finger drag
* turn on app expose gesture

## And The Rest

Finally, I'll go into `Users & Groups` and turn off the guest user (I don't need or want guests to access my computer), go into `Security & Privacy` and choose to require password immediately after sleep (I don't want anyone accessing my laptop after I put it to sleep), and then in the `Spotlight` settings I'll remove all the shortcuts - I'll be replacing Spotlight with Alfred.

###### Other Settings

* Turn off the guest user
* Require password immediately after sleep
* Remove the Spotlight shortcuts

# Finder

There are a few small settings in Finder that I like to change in order to make navigating and managing my files a bit easier.

Open up the Finder preferences and in the `General` tab choose not to show anything on the Desktop. This is a personal choice but I like to keep my Desktop free of clutter, and prefer to access external disks from the Finder sidebar. While in the `General` tab I'd also recommend choosing to open new Finder windows to your home directory.

In the `Tags` tab I turn off all of the tags. I don't use them and they just take up space. Space I need, because in the `Sidebar` tab I like to check absolutely everything. I also create my `Code` directory and add this to the sidebar.

In the `Advanced` tab I check `Keep folders on top when sorting by name`. I like to be able differentiate between folders and files easily when looking at a Finder window.

###### Finder preferences

* Don't show things on desktop
* Open new windows to Home
* Remove all the tags
* Show everything in the sidebar
* Create and add your Code directory to the sidebar
* Keep folders on top when sorting by name

# Hidden Settings

There are a couple of other settings that I like to enable that have to be done through the terminal.

First, if I hold down a key I want it to repeat, but mac OS doesn't enable this by default. Repeating keys makes it much easier to navigate around a text editor by pressing and holding the arrow keys. The following command will enable this behaviour:

```
$ defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false
```

I also like to set a custom screenshot path, so that my screenshots aren't dumped onto my desktop:

```
$ mkdir ~/Pictures/screenshots
$ defaults write com.apple.screencapture location ~/Pictures/screenshots && killall SystemUIServer
```

# Installing things!

Now that all those boring settings are set how I like them, it's time to start installing stuff! To install anything on your mac you're going to want to use Homebrew as a package manager. But to use Homebrew, first you're going to need to install Xcode. [Download Xcode from Apple](https://developer.apple.com/xcode/), and then run:

```
$ xcode-select --install
```

This is going to take a while... make a drink, put your feet up, and think about all the programs you want to install on your new mac.

Once it's finally done we can install Homebrew itself:

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then, we'll add the Homebrew directory to our bash path, this means that our terminal will have access to the programs we install:

```
$ echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bash_profile
```

Finally we want to install Cask, which will let us download mac OS apps and other non-open source software:

```
$ brew tap caskroom/cask
```

Now that Homebrew is set up you can install some of your favourite apps. Here are some that I like to install right away:

```
$ brew cask install \
    alfred \
    google-chrome \
    spotify \
    sketch \
    slack \
    iterm2 \
    numi \
    postman \
    spectacle \
    visual-studio-code
```

# Setting up iTerm2

First of all it's nice to add a splash of color to your terminal, so head over to [this collection of iTerm2 themes](https://github.com/mbadolato/iTerm2-Color-Schemes) and install one that you like. Personally I use the `BlulocoDark` theme. Then you can check out [this bash prompt generator](http://ezprompt.net/) and copy the outut into your `~/.bash_profile` to get your terminal prompt looking just how you want.

![my terminal](/assets/terminal.png)

Another thing I like to do in iTerm is set up keyboard shortcuts so that I can navigate the text just like I would in a text editor. Open up your iTerm2 preferences, and navigate to profile, then keys. Add the following shortcuts:

Shortcut | Action | Characters to send
--- | --- | ---
⌘← | Send Escape Sequence| OH
⌘→ |Send Escape Sequence| OF
⌥← | Send Escape Sequence| b
⌥→ |Send Escape Sequence| f

# Setting up Git

It's hard to get by as a developer without having Git set up n your machine. Start by intalling Git:

```
$ brew install git
```

Then, set up your Git user:

```
$ git config --global user.name "Your Name Here"
$ git config --global user.email "your_email@youremail.com"
$ git config --global credential.helper osxkeychain
```

Create your SSH key to authenticate with GitHub:

```
$ ssh-keygen -t rsa -C "your_email@example.com"
$ eval "$(ssh-agent -s)"
```

Open up `~/.ssh/config` in your text editor and edit it to look like the following:

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```

This tells your machine to use the ssh key you just created for all hosts, if you need multiple keys (for example sperate work and a personal keys), you could set that up here.

Now, add your key to the SSH agent:

```
$ ssh-add -K ~/.ssh/id_rsa
```

You can now run `pbcopy < ~/.ssh/id_rsa.pub` and paste the result into you GitHub SSH key settings so that you can authenticate yourself when pushing to your repositories.

The last thing to do with our Git setup is create a global `.gitignore` file, to ignore common files that we don't want going into version constrol:

```
$ curl https://raw.githubusercontent.com/github/gitignore/master/Global/macOS.gitignore -o ~/.gitignore
```

# Setting up Node

If you're a front-end developer your going to be using Node and npm in some capacity. I like to use nvm to manage my node versions, so let's install it:

```
$ brew install nvm
```

Next we're going to add a command to our bash profile so that nvm runs when we open a new terminal:

```
$ echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.bash_profile
```

And finally, we'll install the latest stable version of Node:

```
$ nvm install stable
```

# Install mySQL (optional)

If you use mySQL then it's easy to install with Homebrew:

```
$ brew install mysql
$ brew services start mysql
```

You'll then be able to log in as `root` (which will have a blank password).

# Visual Studio Code extensions

your mac is now starting to look like more of a developer's machine! The final step is to install your favourite VS Code plugins to streamline you development process. Here are some of my favourites:

![My visual studio code editor](/assets/visual-studio-theme.png)

###### Material icons and theme
This is a really attractive theme, and looks great coupled with the Fira Code font with ligatures enabled.

###### Bracket Pair Colorizer
This package colors your bracket pairs so that matching brackets have matching colours. Saves a bunch of time when you are refactoring and can't make out which bracket belongs where.

###### Indenticator
Indenticator colors the indents of your code so that you can easily make out what is nested where.

###### Import Cost
Import cost puts the file size of imports next to your import statements so that you can eaily track down what's adding weight to your bundle.

###### GitLens
GitLens is great if you work in a team as you can see straight in your editor who committed which lines of code and when, so you know who to ask about anything confusing.

###### NPM Intellisense
NPM Intellisense autocompletes import paths for you. It's worth it's weight in gold.

###### Auto Rename Tag/Auto Close Tag
These two packages auto close and auto rename React tags, makes refactoring React code much less painful.

###### ESLint
ESlint requires some additional npm packages and setup in order to work correctly, but it shouldn't be overlooked as on-the-fly linting of your code is invaluable in helping you stick to a consistent style and detect bugs early on.

# That's All Folks
Are there any must-have settings, programs, or extensions that I've missed here? Let me know in the comments.  



