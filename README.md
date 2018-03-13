# Retirement Party Server

> Event management and creation system server

## Build Setup

1. Install NodeJS from here https://nodejs.org/en/download/. Go with the LTS version
   * If you are on Linux you will need to use these commands to get NodeJS installed
      ```
      curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
      sudo apt-get install -y nodejs
      ```
2. Install VSCode from here https://code.visualstudio.com/Download
   * If you are using a MacOS machine, you will need to follow the instructions on the this page before installing the VSCode extensions
   https://code.visualstudio.com/docs/setup/mac
4. Clone the repo into your desired folder
   * Make sure to switch to the development branch and create your own branch from there
5. While you are in VSCode, open the folder where you cloned the repo
6. Hit CTRL+\` and the embedded terminal will come up
7. Type `npm install`, go get a drink...
8. Type `npm start`, and the server will be launched, and you can use Postman to test APIs
9. The list of the all commands is provided below

##

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:4040
npm start

# serve with hot reload and debugging at localhost:4040
npm run start:debug

# run unit tests
npm run tdd

# run all tests
npm run test
```

## Extensions for VS Code
Just run these commands from the command line and you should be good to go
```
code --install-extension christian-kohler.npm-intellisense
code --install-extension christian-kohler.path-intellisense
code --install-extension dariofuzinato.vue-peek
code --install-extension dbaeumer.vscode-eslint
code --install-extension donjayamanne.githistory
code --install-extension EditorConfig.EditorConfig
code --install-extension eg2.vscode-npm-script
code --install-extension esbenp.prettier-vscode
code --install-extension formulahendry.auto-close-tag
code --install-extension formulahendry.auto-rename-tag
code --install-extension lukehoban.Go
code --install-extension octref.vetur
code --install-extension robertohuertasm.vscode-icons
code --install-extension sandeepthukral.nightwatch-js-snippets
code --install-extension xabikos.JavaScriptSnippets
code --install-extension zhuangtongfa.Material-theme
```
