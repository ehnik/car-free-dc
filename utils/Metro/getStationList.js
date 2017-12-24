//takes station location and returns arriving trains
import postApi from './postApi'

export default function getStationList(){

  var stationCodeParams = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05"
            /*"Lat": location.lat,
            "Lon": location.lng,
            "Radius": "500",*/
  };

//returns data for station entrance closest to submitted location

let stations = $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(stationCodeParams),
            type: "GET"
  })

stations.done(function(data){
      for(let station of data['Stations']){
      postApi(station);
    }
  })
}
