//Model for station information entries in MongoDB collection.

let restful = require('node-restful');
let mongoose = restful.mongoose;
mongoose.connect("mongodb://localhost/api/stations")

let Schema = mongoose.Schema

let stationSchema = new Schema({
  AddressDetails: Schema.Types.Mixed,
  Code: String,
  Lat: Number,
  LineCode1: String,
  LineCode2: String,
  LineCode3: String,
  LineCode4: String,
  Lon: Number,
  Name: String,
  StationTogether1: String,
  StationTogether2: String
})

module.exports = restful.model('Stations', stationSchema)
