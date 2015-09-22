var webpack                 = require('webpack');
var merge                   = require('webpack-merge');
var path                    = require('path');
var HtmlwebpackPlugin       = require('html-webpack-plugin');
var ExtractTextPlugin       = require('extract-text-webpack-plugin');
var Clean                   = require('clean-webpack-plugin');
var AssetsPlugin            = require('assets-webpack-plugin');
var autoprefixer            = require('autoprefixer');
var precss                  = require('precss');
var pkg                     = require('./package.json');

var ROOT_PATH = path.resolve(__dirname);
var ENV = process.env.NODE_ENV || 'development';
var APP_TITLE = 'Reactive Meli';

var commonConfig = {
    entry: path.resolve(ROOT_PATH, 'app/main.jsx'),
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },
    postcss: [
        autoprefixer({ browsers: [
            'last 5 versions'
        ]}),
        precss
    ]
};

if (ENV === 'development') {
    module.exports = merge(commonConfig, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['react-hot', 'babel'],
                    include: path.resolve(ROOT_PATH, 'app')
                },
                {
                    test: /\.s?css$/,
                    loaders: [
                        'style',
                        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
                    ],
                    include: path.resolve(ROOT_PATH, 'app')
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
                title: APP_TITLE
            })
        ]
    });
}

if (ENV === 'production') {
    module.exports = merge(commonConfig, {
        entry: {
            app: path.resolve(ROOT_PATH, 'app/main.jsx'),
            vendor: Object.keys(pkg.dependencies)
        },
        output: {
            path: path.resolve(ROOT_PATH, 'build'),
            filename: '[name].[chunkhash].js'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.s?css$/,
                    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[hash:base64:7]!postcss'),
                    include: path.resolve(ROOT_PATH, 'app')
                },
                {
                    test: /\.jsx?$/,
                    loaders: ['babel'],
                    include: path.resolve(ROOT_PATH, 'app')
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                    loader: 'url?limit=4096'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('style.[chunkhash].css'),
            new Clean(['build']),
            new webpack.optimize.CommonsChunkPlugin(
                'vendor',
                '[name].[chunkhash].js'
            ),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new AssetsPlugin({
                path: path.resolve(ROOT_PATH, 'build'),
                filename: 'assets.json'
            }),
            new HtmlwebpackPlugin({
                title: APP_TITLE
            })
        ]
    });
}
