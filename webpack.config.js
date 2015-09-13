var webpack                 = require('webpack');
var path                    = require('path');
var HtmlwebpackPlugin       = require('html-webpack-plugin');
var autoprefixer            = require('autoprefixer');
var precss                  = require('precss');

var ROOT_PATH = path.resolve(__dirname);

var cssLoaders = [
    'style',
    'css?modules&importLoaders=1!postcss'
];

module.exports = {
    entry: path.resolve(ROOT_PATH, 'app/main.jsx')
    ,
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
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.resolve(ROOT_PATH, 'app')
            },
            {
                test: /\.s?css$/,
                loaders: cssLoaders,
                include: path.resolve(ROOT_PATH, 'app')
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url?limit=10000'
            }
        ]
    },
    postcss: [
        autoprefixer({ browsers: [
            'last 5 versions'
        ]}),
        precss
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlwebpackPlugin({
            title: 'Reactive Meli'
        })
    ]
};

