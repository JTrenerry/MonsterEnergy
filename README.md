# Installation

#### 1) Download [npm](https://www.npmjs.com/)

For arch it is:
```sudo pacman -S npm```    
   
[For anything else here is how to install Arch](https://wiki.archlinux.org/title/installation_guide)

#### 2) Download the latest release

Click the release tab and download, once down unzip it

#### 3) Run npm install in the node dir
i.e.
  ```cd ./node```
  ```npm install```

# Running the program
There are two ways to set this up, either just run:
  ```npm run```
or you can set it up as a service and run it on boot, [this should help to set that up](https://wiki.archlinux.org/title/systemd#Writing_unit_files)

# Output
It outputs all of its scarping to output.txt, currently this is then given to a [desklet notepad](https://cinnamon-spices.linuxmint.com/desklets/view/38) to display, this will be changed in the future to have a custom desklet for the display.
