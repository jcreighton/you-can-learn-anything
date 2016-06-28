var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var Visualizer = require('webpack-visualizer-plugin');
var nodeExternals = require('webpack-node-externals');

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
    root: [
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new Visualizer()
  ],

  node: {
    fs: 'empty'
  },

  target: 'node',
  externals: [nodeExternals()],

  cache: false,

};