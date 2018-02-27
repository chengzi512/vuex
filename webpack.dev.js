const merge = require('webpack-merge'),
    webpack = require("webpack"),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    common = require('./webpack.config');
module.exports = merge(common, {
    devtool: '#eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//热模块替换插件
        new OpenBrowserPlugin({url:'http://127.0.0.1:8008'}),
    ],
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true,
        hot:true,
        host:'127.0.0.1',
        port: '8008',
        proxy:{
            '/apiPath':{
                target:'http://10.30.0.33:80',
                pathRewrite:{'^/apiPath':'/'},
                changeOrigin: true,
                secure:false
            }
        }
    }
})