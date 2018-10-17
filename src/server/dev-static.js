const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const memoryfs = require('memory-fs');
const ReactSSR = require('react-dom/server');
const proxy = require('http-proxy-middleware');

const getTemplate = function () {
  return new Promise(function(resolve,reject){
    axios
      .get("http://localhost:8888/public/index.html")
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error){
        reject(error)
      });
  })

}

const mfs = new memoryfs;
const Module = module.constructor;

const webpackConfigJS = require('../../webpack.server.js');

const webpackCompiler = webpack(webpackConfigJS);
//指定webpackCompiler的输出，到mfs里面，以后就是内存中读写了，而不是去磁盘上了

let serverBundle;
webpackCompiler.outputFileSystem = mfs;
webpackCompiler.watch({},function(err,stats){
  if(err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
    webpackConfigJS.output.path,
    webpackConfigJS.output.filename
  )

  const bundle = mfs.readFileSync(bundlePath,'utf-8');
  //bundle读取出来是string的内容，而不是在js中可以使用的内容
  //通过上面拿到module的构造函数，new出一个新对象，然后通过_compile方法，去解析string的内容，生成新的模块
  const m = new Module();
  m._compile(bundle,'server.js');
  serverBundle = m.exports.default;

})


module.exports = function(app){

  app.use('/public',proxy({
    target:'http://0.0.0.0:8888'
  }))

  app.get('/', (req, res) => {

    getTemplate().then(template => {
      const appString = ReactSSR.renderToString(serverBundle);
      res.send(template.replace('<!-- app -->',appString));
    })
  })

}
