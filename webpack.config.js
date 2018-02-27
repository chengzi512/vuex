const path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require("html-webpack-plugin");

// const extractCss = new ExtractTextPlugin('static/css/[name]-css.css');
// const extractLess = new ExtractTextPlugin('static/css/[name]-less.css');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: path.posix.join('static', 'js/[name].[hash:7].js'),
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.common.js',
            '@': __dirname + '/src',
        },
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:[
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: ExtractTextPlugin.extract({
                                    use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'autoprefixer-loader'],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: {
                    loader:'json-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static', 'json/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'autoprefixer-loader','postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                }),
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: path.resolve(__dirname, './src/assets/favicon.ico'),
            template: 'index.html',
            title:'星地通-新橙北斗',
            inject: true
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].css',
            allChunks: true
        })
        // extractLess,
        // extractCss
    ]
}