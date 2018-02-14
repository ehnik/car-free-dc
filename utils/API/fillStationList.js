//Retrieves station data from WMATA

const request = require('request')

const saveData = require('./saveData')

module.exports = function fillStationList(){

  let key = "a6e753a87f8d49a086f85f165ace7a05"

  let stationsRequest = "https://api.wmata.com/Rail.svc/json/jStations?api_key=" + key


  request.get(stationsRequest, (error,response,getBody)=> {
    if(!error){
      console.log(getBody)
      //let results = JSON.parse(body)
      request.post({
        headers: {'Content-Type': 'application/json'},
        url: 'http://localhost:4000/api/stations/seed',
        body: getBody
        },
        (error,response,postBody)=>{
          console.log("response")
          console.log(postBody)
        }
      )
    }
    else{
      console.log("Please submit your search again.")
    }
  })

}
