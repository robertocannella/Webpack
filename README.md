# A Webpack 5 guide

## About:
This repository is  derived from a course created by [Viktor Pyskunov](https://www.udemy.com/user/viktor-pyskunov/), available on Udemny.  
 TODO: add course summary.

Course Outline:
* Setup and Itegration
* Asset Modules
* Loaders
* Plugins
* Prod/Dev Builds
* Multiple Page Applications
* Github
* Webpack with Node/Express
* Module Federation
* Integration with JQuery
* Configuring ESLint

## Configuration/Setup

### Build folder structure:
Set up folder structure as follows.  Use commit labeled: 'first commit' for initial file state. 
```
    root-|
         |-> src
               |-- hello-world.js
               |-- index.js
         |-- index.html
```
### Install Dependencies:

Initialize npm package manager:
```
npm init -y 
```
Install Webpack and Webpack CLI as a development dependencies:
```
npm install -D webpack webpack-cli
```

**note: be sure to add /node_modules to .gitignore if using source control*

### Integrating Webpack:

Webpack allow the use of **ES6 Import Modules**.  Once refactoring the javascript code to implement ES6 functionality, webpack is ready to use. With no configuartion to this point, execute the following command in the termal to build the Webpack bundle:

```
npx webpack
```
Though a configuration warning is displayed, Webpack creates a folder named ```dist``` that includes a ```main.js``` file.  The next steps outline configuration of Webpack

**note: be sure to add /dist to .gitignore if using source control*

### Configure Webpack

Create a javascript file named ```webpack.config.js``` inside the root folder.  This file will hold all configuration for Webpack.  Here is a basic configuration file which is a JavaScript Module.  Note the use of ```Common.js``` imports.  This is required only for the Webpack configuration file.  All other files use ECMAScript6 Imports. 
```
const path = require('path'); 
module.exports = {
    entry: './src/index.js', 
    output: {          
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist') // 
    },
    mode: 'none'
}
```
Inside the ```index.html``` file, point the script src to this ```bundle.js``` file:
```
<body>
    <script src="./dist/bundle.js"></script>
</body>
```






