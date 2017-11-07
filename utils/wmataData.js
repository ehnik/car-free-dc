export function getNextTrain(){
        var key = {
            "api_key": "e1eee2b5677f408da40af8480a5fd5a8"
            // Request parameters
        };

        $.ajax({
            url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/A03?" + $.param(key),
            type: "GET",
        })
        .then(function(response) {
            console.log(response);
        })
}

export function getTrainLine(){
        var key = {
            "api_key": "e1eee2b5677f408da40af8480a5fd5a8"
            // Request parameters
        };

        $.ajax({
            url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/A03?" + $.param(key),
            type: "GET",
        })
        .then(function(response) {
            console.log(response);
        })
}

export function getClosestStation(location){
        var key = {
        "key": "AIzaSyAZpkdkZpwF02oUj-0wPx23vi-qs_FqjcY"
        // Request parameters
        };

        var location = location;


      $.ajax({

        url: "https://api.wmata.com/Rail.svc/json/jStationEntrances" +
        $.param(key) + $.param(location.lat) + $.param(location.lng),
        type: "GET",
        dataType: 'jsonp',
        headers: {
                    'Access-Control-Allow-Origin': '*'
                },
        cache: false,
      })
      .then(function(response) {
        console.log(response);
      })
  }
