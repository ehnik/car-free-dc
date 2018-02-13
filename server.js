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
    res.send(stationsObj);
  })
})

//handles POST request; seeds WMATA station list data to database
app.post('/api/stations/seed',function(req,res){
  let data = req.body
    console.log("adding data")
    console.log(data['Stations'])
      data['Stations'].forEach( (station)=>{
        Station.create(station, (err,station)=>console.log(err))
      })
  });

app.listen(4000);
