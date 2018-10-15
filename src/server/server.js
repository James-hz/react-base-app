const express = require('express');
const ReactSSR = require('react-dom/server');
const serverDoor = require('../../builds/bundle.js').default;

const app = express();

//一旦访问这个应用的根路径的时候
app.get('/', (req, res) => {
  const appString = ReactSSR.renderToString(serverDoor);
  res.send(appString);
})

app.listen(8888, () => {
  console.log('Example app listening on port 8000!')
})
