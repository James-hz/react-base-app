const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  //告诉服务器按照node来打包，因为node服务器端不需要将引入的第三方包全部代码都打包进入bundle.js里面，而浏览器端react是需要全部打包进入的
  target:'node',
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname, 'build')
  },
  externals:[nodeExternals()],
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
