let mongoose = require('mongoose');
let connection = mongoose.connect('mongodb://localhost/stations',{
  useMongoClient: true,
});

connection.then(function(db){
  console.log(db)
})

let Schema = mongoose.Schema

let StationSchema = new Schema({
  code: String
  /*addressDetails: Schema.Types.Mixed,
  code: String,
  lat: Number,
  lineCode1: String,
  lineCode2: String,
  lineCode3: String,
  lineCode4: String,
  lon: Number,
  name: String,
  stationTogether1: String,
  stationTogether2: String*/
})

module.exports = mongoose.model("Station", StationSchema)
