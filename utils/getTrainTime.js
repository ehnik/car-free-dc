//takes station location and returns arriving trains

export default function getStationPredictions(location,callback){

  var stationCodeParams = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05",
            "Lat": location.lat,
            "Lon": location.lng,
            "Radius": "500",
  };

  var trainPredictionParams = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05"
  };

//returns data for station entrance closest to submitted location
  var stationCode = $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStationEntrances?" + $.param(stationCodeParams),
            type: "GET"
  }),
      trainTime = stationCode.then(function(data){
        var stationCode = data['Entrances'][0]['StationCode1']
        //gets arriving train data for closest station
        return $.ajax({
            url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + stationCode
            + '?'+$.param(trainPredictionParams),
            type: "GET",
        })
  })


trainTime.done(function(data){
    callback(data)
  })
}
