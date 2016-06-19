var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');

module.exports = {
  entry: [
    './src/editor'
  ],
  output: {
    filename: 'editor.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { 
          presets: ['react', 'es2015']
        }
      },
      // {
      //   test: /\.css$/,
      //   exclude: /flexboxgrid|normalize\.css$/,
      //   loaders: ['style-loader',
      //   'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']
      // },
      // {
      //   test: /\.css$/,
      //   include: /flexboxgrid|normalize\.css$/,
      //   loaders: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      //   loader: 'url-loader?limit=100000'
      // }
    ]
  },

  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js']
  },

  plugins: [
    // new webpack.optimize.ExtractTextPlugin()
  ],

  node: {
    fs: 'empty'
  },

  cache: false,

  // devtool: 'eval-source-map'
};