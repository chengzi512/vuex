const merge = require('webpack-merge'),
    webpack = require("webpack"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    common = require('./webpack.config');

module.exports = merge(common, {
        entry: {
            app: './src/main.js',
            vendor:['vue','vue-router']
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new CleanWebpackPlugin(['dist']),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor"
            }),
            new UglifyJSPlugin()
        ],

    }
)