var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
  entry: [
    './src/app'
  ],
  output: {
    filename: 'public/app.js',
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
      }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  node: {
    fs: 'empty'
  },

  target: 'node',

  cache: false,

};