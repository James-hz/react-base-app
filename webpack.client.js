const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const config = {
  mode:'development',
  entry:{
    client: path.resolve(__dirname,'./src/client/entry.js')
  },
  output:{
    filename:'[name].[hash].js',
    path:path.resolve(__dirname, 'build'),
    publicPath:'/public/'
  },
  module:{
    rules:[
      {
        enforce: "pre",
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
    ]
  },
  plugins:[
    new HTMLPlugin({
      template:path.resolve(__dirname,'./src/template.html')
    })
  ]
}

if(isDev){
  config.entry = {
    client: [
      'react-hot-loader/patch',
      path.resolve(__dirname,'./src/client/entry.js')
    ]
  }

  config.devServer = {
    host:'0.0.0.0',
    port:'8888',
    contentBase:path.resolve(__dirname, 'build'),
    hot:true,
    overlay:{
      errors:true,
    },
    publicPath:'/public',
    historyApiFallback:{
      index:'/public/index.html',
    }
  }

  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}


module.exports = config;
