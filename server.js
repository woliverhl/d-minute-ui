
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');

//Creando el servidor
const app = express();
app.use(express.static(__dirname + '/dist'));
app.set('views', path.join(__dirname, 'src'));

var allowCrossDomain = function(req, res, next) {
  if ('OPTIONS' == req.method) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);

console.log("LOG: app creado");

//Define puerto
const port = process.env.PORT || '8080';
app.set(port);
console.log("LOG: puerto seteado");

const server = http.createServer(app);
console.log("LOG: server creado");
server.listen(port, () => console.log("App now running on port", port));
