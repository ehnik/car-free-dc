//returns next trains arriving at a given station

import convertLineColor from './convertLineColor.js'

export default function getNextTrain(stationInfo,line){
  line = convertLineColor(line);
  let stationCode = stationInfo['Code'];
  let params = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05",
  };
  let nextTrains = $.ajax({
      url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + stationCode
      + '?'+$.param(params),
      type: "GET"
    }).then((response) => {
      let trains = response['Trains'];
      let finalTrains = [];
      trains.forEach( (train) =>{
        if(train['Line']==line){
          finalTrains.push(train)
        }
      })
      return finalTrains;
  })
  return nextTrains;
}
