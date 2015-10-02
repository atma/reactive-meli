var webpack                 = require('webpack');
var merge                   = require('webpack-merge');
var path                    = require('path');
var ExtractTextPlugin       = require('extract-text-webpack-plugin');
var Clean                   = require('clean-webpack-plugin');
var AssetsPlugin            = require('assets-webpack-plugin');
var autoprefixer            = require('autoprefixer');
var precss                  = require('precss');
var pkg                     = require('../package.json');

var ROOT_PATH = path.resolve(__dirname, '..');
var buildPath = path.resolve(ROOT_PATH, './public/dist');
var ENV = process.env.NODE_ENV || 'development';

var commonConfig = {
  entry: path.resolve(ROOT_PATH, 'app/main.jsx'),
  postcss: [
    autoprefixer({
      browsers: [
        'last 5 versions'
      ]
    }),
    precss
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'app']
  }
};

if (ENV === 'development') {
  module.exports = merge(commonConfig, {
    devtool: "source-map",
    entry: [
      "webpack-dev-server/client?http://0.0.0.0:" + ((process.env.PORT + 1) || 3001),
      "webpack/hot/only-dev-server",
      path.resolve(ROOT_PATH, 'app/main.jsx')
    ],
    output: {
      filename: "bundle.js",
      chunkFilename: "[name].bundle.js",
      path: buildPath,
      publicPath: "http://0.0.0.0:" + ((process.env.PORT + 1) || 3001) + "/dist/"
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
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify('development'),
          BROWSER: JSON.stringify(true)
        }
      })
    ]
  });
}

if (ENV === 'production') {
  module.exports = merge(commonConfig, {
    entry: {
      app: path.resolve(ROOT_PATH, 'app/main.jsx'),
      vendor: ['react']
    },
    output: {
      path: buildPath,
      filename: '[name].[chunkhash].js',
      publicPath: '/dist/'
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
      new Clean(['dist'], path.resolve(ROOT_PATH, 'public')),
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
        path: buildPath,
        filename: 'assets.json'
      })
    ]
  });
}

function renderTemplate(template, replacements) {
  return function() {
    //let t = fs.readFileSync(path.join(__dirname, 'templates/index.tpl'), 'utf8');

    return template.replace(/%(\w*)%/g, function(match) {
      var key = match.slice(1, -1);

      return replacements[key] ? replacements[key] : match;
    });
  };
}
