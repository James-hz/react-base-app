const express = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === "development";

const app = express();

if(isDev){
  const devStatic = require('./dev-static');
  devStatic(app);

}else{
  //非开发环境下，是存在目录的
  const serverDoor = require('../../build/server.js').default;

  const template = fs.readFileSync(path.resolve(__dirname,'../../build/index.html'),'utf-8');
  app.use('/public',express.static(path.resolve(__dirname,'../../build')));

  app.get('/', (req, res) => {
    const appString = ReactSSR.renderToString(serverDoor);
    res.send(template.replace('<!-- app -->',appString));
  })
}
//一旦访问这个应用的根路径的时候
app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})
