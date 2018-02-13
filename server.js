const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const getStationList = require('./utils/API/getStationList')
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/build'))

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile("index.html", {root: path.join(__dirname, '/build')});
})

//the GET and POST create the file station_list.json, containing WMATA station data

app.get('/api/stations/seed',function(req,res){
  getStationList()
  res.send('posted');
})

app.get('/api/stations/',function(req,res){
  getStationList()
  res.send('posted');
})

app.post('/api/stations',function(req,res){
  let data = JSON.stringify(req.body)
  fs.writeFile('./station_list.json', data, (err) => {

    res.send('saved');
  });
})

app.listen(4000);
