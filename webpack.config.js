const path = require('path'); // <-- needs to be common.js style import true as of Webpack 5.  

module.exports = {
    entry: './src/index.js', // <-- Webpack will start from this file when running the build process.
    output: {                // <-- Output file and directory,  will be created if it doesn't exist. 
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist') // 
    },
    mode: 'none'
}