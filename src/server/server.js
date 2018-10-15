const express = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const serverDoor = require('../../build/server.js').default;

const template = fs.readFileSync(path.resolve(__dirname,'../../build/index.html'),'utf-8');

const app = express();

app.use('/public',express.static(path.resolve(__dirname,'../../build')));

//一旦访问这个应用的根路径的时候
app.get('/', (req, res) => {
  const appString = ReactSSR.renderToString(serverDoor);
  res.send(template.replace('<!-- app -->',appString));
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})
