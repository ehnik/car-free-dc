const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const getStationList = require('./utils/API/getStationList')
const Station = require('./utils/models/station.js')
const cors = require('cors');
const fs = require('fs');

const app = express();

//allow cross-origin requests so front-end can pull from api
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/MetroStations")

//handles get request

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

app.listen(3000);
