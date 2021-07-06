const {
    merge
} = require('webpack-merge')
const commonConfig = require('./webpack.config')
const webpack = require('webpack')
const path = require('path')

/**@type {import('webpack').Configuration} */
const config = merge(commonConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 8080,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = config