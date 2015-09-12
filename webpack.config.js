var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

var cssLoaders = ['style', 'css', 'autoprefixer-loader?browsers=last 5 versions'];

module.exports = {
    entry: path.resolve(ROOT_PATH, 'app/main'),
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: cssLoaders,
                include: path.resolve(ROOT_PATH, 'app')
            },
            {
                test: /\.scss$/,
                loaders: cssLoaders.concat([
                    "sass?precision=10&outputStyle=expanded&sourceMap=true&includePaths[]=" + path.resolve(__dirname, './app')
                ])
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url?limit=10000'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlwebpackPlugin({
            title: 'Reactive Meli'
        })
    ]
};

