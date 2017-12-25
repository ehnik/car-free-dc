//returns next 
export default function getNextTrain(stationInfo){
  let stationCode = stationInfo[0]['Code'];
  console.log(stationInfo);
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
