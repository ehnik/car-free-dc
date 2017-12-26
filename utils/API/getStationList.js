//Populates MongoDB database with information for each DC metro station (pulled
//from WMATA API).

import saveData from './saveData'

export default function getStationList(){

  var params = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05"
  };

//makes request to WMATA API for station information
let stations = $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
            type: "GET"
  })

//Saves retrieved station information in database

stations.done(function(data){
      for(let station of data['Stations']){
      saveData(station,'stations');
    }
  })
}
