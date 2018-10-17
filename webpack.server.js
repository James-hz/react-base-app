const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.base.js');

module.exports = webpackMerge(webpackBase, {
  target:'node',
  mode:'development',
  entry:{
    server:path.resolve(__dirname,'./src/server/entry.js')
  },
  output:{
    filename:'server.js',
    path:path.resolve(__dirname, 'build'),
    publicPath:'/public/',
    libraryTarget:'commonjs2'
  }
})
