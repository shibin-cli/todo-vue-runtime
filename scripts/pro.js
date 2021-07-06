const {
    merge
} = require('webpack-merge')
const commonConfig = require('./webpack.config')

/**@type {import('webpack').Configuration} */
module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        clean: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
})