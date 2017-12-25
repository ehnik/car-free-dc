const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(__dirname + '/build'))

app.get('/*', function(req, res){
  res.sendFile("index.html", {root: path.join(__dirname, '/build')});
})

app.listen(4000);
