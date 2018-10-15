const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
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
  },
  externals:[nodeExternals()],
  module:{
    rules:[
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
