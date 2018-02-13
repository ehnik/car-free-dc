const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/MetroStations")

let Schema = mongoose.Schema

let stationSchema = new Schema({
  AddressDetails: Schema.Types.Mixed,
  Code: { type: String, index: { unique: true } },
  Lat: String,
  LineCode1: String,
  LineCode2: String,
  LineCode3: String,
  LineCode4: String,
  Lon: String,
  Name: String,
  StationTogether1: String,
  StationTogether2: String
})

let Station = mongoose.model('Station',stationSchema)

module.exports = Station
