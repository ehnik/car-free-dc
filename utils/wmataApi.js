export default function getTrainData(){
        var params = {
            "api_key": "e1eee2b5677f408da40af8480a5fd5a8",
            // Request parameters
        };

        $.ajax({
            url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/SGR?" + $.param(params),
            type: "GET",
        })
        .then(function(response) {
            console.log(response);
        })
    }
