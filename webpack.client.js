const path = require('path');

module.exports = {
  //告诉服务器按照
  target:'node',
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname, 'build')
  },
  module:{
    rules:[{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  }
}
