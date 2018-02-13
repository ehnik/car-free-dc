//Sends post request with retrieved station data to backend API
const request = require('request')

let stationsRequest = '/api/stations'

module.exports = function postStationList(data){
  request.post({
  headers: {'Content-Type': 'application/json'},
  url: 'http://localhost:3000/api/stations/seed',
  body: data
  },
  (error,response,body)=>{
    console.log("post req send")
    console.log(response)
  }
)
}
