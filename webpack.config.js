const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin  = require('extract-text-webpack-plugin');
const website = {
    publicPath: "http://localhost:9090/"
}

module.exports = {
    entry: {
        entry: './src/entry.js',
        entry1: './src/entry1.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: [{
                //     loader: 'style-loader'
                // }, {
                //     loader: 'css-loader'
                // }],
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.js$/,
                use: [{
                  loader: 'babel-loader',
                  options: {
                     presets: ['es2015']
                  }
                }],
                // exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000
                    }
                }]
            }
        ]
    },
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true   //去掉引号
            },
            hash: true, //生成hash值
            template: './src/index.html'   // 以这个html为模板
        }),
        new extractTextPlugin("/css/index.css")
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        compress: true,
        port: 9090
    }
}