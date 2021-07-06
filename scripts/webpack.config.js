const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**@type {import('webpack').Configuration} */
module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        filename: 'js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: path.resolve(__dirname, '../dist/index.html')
        })
    ]
}