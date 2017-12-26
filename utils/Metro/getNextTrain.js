//returns next trains arriving at a given station

export default function getNextTrain(stationInfo){
  let stationCode = stationInfo[0]['Code'];
  let params = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05",
  };
  let nextTrains = $.ajax({
      url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + stationCode
      + '?'+$.param(params),
      type: "GET",
    })
  return nextTrains
}
