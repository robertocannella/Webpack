const path = require('path'); // <-- needs to be common.js style import true as of Webpack 5.  

module.exports = {
    entry: './src/index.js', // <-- Webpack will start from this file when running the build process.
    output: {                // <-- Output file and directory,  will be created if it doesn't exist. 
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'), // 
        publicPath: 'dist/'
    },
    mode: 'none',
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset/inline',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024// 3 kilobytes
                    }
                },

            },
            {
                test: /\.txt$/,
                type: 'asset/source'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },

            {
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
            }
        ]
    }
}