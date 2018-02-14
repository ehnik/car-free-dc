const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fillStationList = require('./utils/API/fillStationList')
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Station = require('./models/station')

const app = express();

app.use(express.static(__dirname + '/build'))

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//handles GET request to root

app.get('/', function(req, res){
  res.sendFile("index.html", {root: path.join(__dirname, '/build')});
})

//handles GET request to stations API

app.get('/api/stations',function(req,res){
  Station.find({}, (err,stations)=>{
    let stationsObj = {}
    stationsObj['Stations'] = stations
    JSON.stringify(stationsObj)
    res.status(200).send(stationsObj);
  })
})

//triggers database seed with WMATA data

app.get('/api/stations/seed',function(req,res){
  getStationList()
  res.status(200).send("ok")
});

//handles POST request; seeds WMATA station list data to database
app.post('/api/stations/seed',function(req,res){
  let data = req.body
  data['Stations'].forEach( (station)=>{
    Station.create(station, (err,station)=>{
      err? console.log(err) : console.log(station)
    })
  });
  res.status(200).send("ok")
})

app.get('/', function(req, res){
  res.status(400).send("Page doesn't exist")
})

app.listen(4000);
