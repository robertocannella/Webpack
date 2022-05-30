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

# Setup and Itegration

## Build folder structure:
Set up folder structure as follows.  Use commit labeled: 'first commit' for initial file state. 
```
    root-|
         |-> src
               |-- hello-world.js
               |-- index.js
         |-- index.html
```
## Install Dependencies:

Initialize npm package manager:
```
npm init -y 
```
Install Webpack and Webpack CLI as development dependencies:
```
npm install -D webpack webpack-cli
```

**note: be sure to add /node_modules to .gitignore if using source control*

## Integrating Webpack:

Webpack allow the use of **ES6 Import Modules**.  Once refactoring the javascript code to implement ES6 functionality, webpack is ready to use. With no configuartion to this point, execute the following command in the termal to build the Webpack bundle:

```
npx webpack
```
Though a configuration warning is displayed, Webpack creates a folder named ```dist``` that includes a ```main.js``` file.  The next steps outline configuration of Webpack

**note: be sure to add /dist to .gitignore if using source control*

## Configure Webpack

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

# Asset Modules

### Types of asset imports: 

* asset/resource - for large files (generates a seperate file)
* asset/inline   - for smaller files (creates inline code (base64) to be added directly to ```bundle.js```)
* asset - using webpack config set to automatic generation of resource or inline type asset
* asset/source - add string of text to ```bundel.js```

## asset/resource:
Importing images

For webpack to import images (or any file type), a rule needs to be added to the ```webpack.config.js``` file:

```
module: {
    rules: [
        {
            test: /\.(png|jpeg)$/,
            type: 'asset/resource'
        }
    ]
```
Here, the module property takes a ```rules``` value which declares how webpack handles importing certain file types(using regex). 


### Specifying a public path
In previous verions the ```publicPath``` property was listed as an empty string ```' '```.  This required additional configuration. Webpack 5 automatically configures the publicPath using ```'auto'```.  This defualts to the full url of the file.  The ```publicPath``` property is helpful when using CDNs.  Added the following ```publicPath``` value to the configuration file:

```
...
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/'
...

```

# asset/inline

Generates a base64 represention of the file being imported and bakes it directly into the bundle.  This is helpful for importing SVG as inline code. Using this approach limites HTTP requests for small files.

```
module: {
    rules: [
        {
            test: /\.(png|jpeg)$/,
            type: 'asset/inline'
            publicPath: 'dist/'
        }
    ]
```
# asset (general module type)

Using this value for the ```type``` property in the ```webpack.config.js``` file allows for automatic determination of storing an asset as ```resource``` or ```inline```.  The defualt boundary is 8 kilobytes.  This is configuarable:

```
...
rules: [
    {
        test: /\.(png|jpg)$/,
        type: 'asset/inline',
        parser: {
            dataUrlCondition: {
                maxSize: 3 * 1024// 3 kilobytes
            }
        }
    }
...
```
## asset/source

with ```asset/source``` Webpack parse a text file as a string and injects it into the bundle as is.  This module type does not generate a new file in the ```dist/``` directory.  A new rule needs to be created instruct webpack on handling ```txt``` files:

```
...
    {
        test: /\.txt$/,
        type: 'asset/source'
    }
...
```

# Loaders

Loaders allow importing of addition types of files.  Including CSS, SASS and Newer JavaScript Code(babel)

Loaders need to be installed as seperate npm packages as they are not included with Webpack by default:

```
npm install --save-dev style-loader css-loader
```
Once the loaders are installed, a rule can be added to ```webpack.config.js``` for the specific file type.  Note the use of the keyword ```use``` for loaders vs ```type``` for assets.

```
{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader'
    ]
}
```

Here the loaders are chained.  The order is important as the chain is executed in reverse.  In the example above the css is parsed with the ```css-loader```, then it's passed to ```style-loader``` for processing.  

## Babel loader

This package allows transpiling JavaScript files using Babel and webpack.  Essentially giving the developer the option to use newer JavaScript features when developing.  Install the core ```babel-loader```:

```
 npm install -D babel-loader @babel/core @babel/preset-env
```
For every @babel plugin implemented, it's package needs to be installed and can be referenced in the ```plugin``` key:

```
...
test: /\.m?js$/,
exclude: /(node_modules|bower_components)/,
use: {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env'],
        plugins:
            [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread'
            ]
    }
}
...
```
# Plugins
Plugins are similar to loaders, providing additional configuration to files. But plugins work at the bundle or chunk level and usually work at the end of the bundle generation process. Plugins can also modify how the bundles themselves are created. Plugins have more powerful control than loaders. [reference](https://stackoverflow.com/questions/37452402/webpack-loaders-vs-plugins-whats-the-difference#:~:text=Loaders%20work%20at%20the%20individual,of%20the%20bundle%20generation%20process.)

## Terser as a plugin
The following plugin will minify the JavaScript bundle .  Speeding up load time by refactoring.  The plugins property can imported and then configured as a new istance in ```webpack.config.js```



```
...
const TerserPlugin = require('terser-webpack-plugin')

...

module.exports = {
...
    module: {
        rules: [
         { ... }
        ]
    },
    plugins : [
        new TerserPlugin()
    ]
}
```
All webpack plugins should be installed in development enviroment:
```
npm install terser-webpack-plugin -D
```

*note: as of Webpack 5, the Terser plugin in included by default, so it does not need to be installed in the step above. However it does need to be declared inside the ```webpack.config.js``` file.

##  MiniCssExtract as a plugin

To extract CSS into a different file upon packing, install following plugin:
```
npm i mini-css-extract-plugin -D 
```
Then add declarations to ```webpack.config.js```.  Note that we can specify the filename to be created by passing an object to the instance:
```
...
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
...
    plugins : [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ]
...
```

## Clean plugin for webpack

Browser cache can be managed by applying MD5 hash to the filename during packing:
```
...
    output: {     
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist'), // 
        publicPath: 'dist/'
    },
...
...
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        })
    ]
...
```
Doing this creates a new file name when code changes have be made.  However, this will clog the ```dist/``` directory with older version of the file.   Utilizing the ```clean``` plugin will clear the ```dist/``` directory prior to executing a build:

```
npm install --save-dev clean-webpack-plugin
```
```
...
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

...

    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        }),
        new CleanWebpackPlugin()
    ]
```

Generating these filenames programatically mean the reference in ```index.html``` needs to be updated as well.   To resolve this, webpack can generate the ```index.html``` file during packing:

## Html Webpack Plugin
This plugin generates an ```index.html``` file programatically.  Useful when generating filenames with MD5 hash.

```
npm install --save-dev html-webpack-plugin
```
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
...

    plugins: [
            ...,         
        new HtmlWebpackPlugin()
    ]
```
* note when implementing this plugin, the publicPath needs to be changed to an empty string: 
```
    publicPath: ''

```
Webpack will generate an index.html file within the ```dist/``` folder containing the correct bundle filename references.  The following plugin allows for customizing variables using a template engine.

## Template Engine as plugin
### Handlebars

Install handlebars-loader as devDependency
```
npm i -D handlebars-loader
npm i -save handlebars
```

Adding support for Handlbars requires adding ```hbs``` rule to ```webpack.config.js```. This allows us to create variables for the HtmlWebpackPlugin to pass to the file:

```
...
{
    test: /\.hbs$/,
    use: [
        'handlebars-loader'
    ]
}
...
...
        new HtmlWebpackPlugin({
            template: 'src/index.hbs',
            title: 'Hello World!',
            description: 'Some Description'
        })
...
```
Consuming these variable can be done inside ```src/index.hbs```:
```
...
    <title>{{ htmlWebpackPlugin.options.title }}</title>
    <meta name="description" content="{{htmlWebpackPlugin.options.description}}">
...
```
### EJS
EJS is the default template engine that ships with webpack 5.  no rule needs to be setup,  only a reference to the file inside the HtmlWebpackPlugin object:

```webpack.config.js```:
```
...
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            title: 'Hello World!',
            description: 'Some Description'
        })
...
```
```index.ejs```:
```
...
    <title>
        <%=htmlWebpackPlugin.options.title %>
    </title>
    <meta name="description" content="<%= htmlWebpackPlugin.options.description %>">
...
```

## [Additional plugins](https://webpack.js.org/plugins/)


# Production / Development Builds

Creating seperate files for prodcution and development allows for easier enviroment managment. Create two seperate config files and copy the contents from webpack.config.js into both:

```webpack.developement.config.js```

```webpack.production.config.js```

The following items can be removed from ```webpack.production.config.js```:

* TerserPlugin (import and declaration) as it is included by default in production builds.

The following items can be removed from ```webpack.development.config.js```:
* TerserPlugin (import and declaration) as it is minification is not necessary during development.
* MiniCssExtractPlugin (import and declaration) as extraction isn't required for developement.






















