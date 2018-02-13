//Retrieves station data from WMATA

const request = require('request')

const saveData = require('./saveData')

module.exports = function getStationList(){

  let key = "a6e753a87f8d49a086f85f165ace7a05"

  let stationsRequest = "https://api.wmata.com/Rail.svc/json/jStations?api_key=" + key


  request.get(stationsRequest, (error,response,body)=> {

    if(!error){
      //let results = JSON.parse(body)
      saveData(body);

      //sends search results to client
    }
    else{
      console.log("Please submit your search again.")
    }
  })
//makes request to WMATA API for station information

//Saves retrieved station information in database

/*stations.done(function(data){
      saveData(data,'stations');
  })*/
}
