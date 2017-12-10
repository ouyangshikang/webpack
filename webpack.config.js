const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: {
        entry: './src/entry.js',
        entry1: './src/entry1.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }],
            },
            {
                test: /\.js$/,
                use: [{
                  loader: 'babel-loader',
                  options: {
                     presets: ['es2015']
                  }
                }],
            }
        ]
    },
    plugins: [
        new uglify()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        compress: true,
        port: 9090
    }
}