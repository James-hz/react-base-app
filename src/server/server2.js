import express from 'express';
import React from 'react';
import { renderToString } from '../../node_modules/react-dom/server';

import Main from './containers/main';

const app = express();
const content = renderToString(<Main />)

//一旦访问这个应用的根路径的时候
app.get('/', (req, res) => {
  res.send(`
     <html>
       <head>
         <title>base</title>
       </head>
       <body>
          ${content}
       </body>
     </html>
  `)
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})
