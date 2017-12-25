//populates MongoDB database with lists of DC metro stations

import postApi from './postApi'

export default function getStationList(){

  var params = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05"
  };

let stations = $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
            type: "GET"
  })

stations.done(function(data){
      for(let station of data['Stations']){
      postApi(station);
    }
  })
}
