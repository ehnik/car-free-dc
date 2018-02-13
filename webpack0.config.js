const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: combineLoaders([
        { loader: 'style-loader'},
        { loader: 'css-loader',
          query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }
      ])
    }]
  }
}
