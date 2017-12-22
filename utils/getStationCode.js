//takes station location and returns arriving trains

export default function getStationCode(location){
  console.log("HMR testing")

  var stationCodeParams = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05",
            "Lat": location.lat,
            "Lon": location.lng,
            "Radius": "500",
  };

//returns data for station entrance closest to submitted location

stationCode = $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStationEntrances?",// + $.param(stationCodeParams),
            type: "GET"
  })

/*stationCode.done(function(data){
    callback(data)
  })*/
}
