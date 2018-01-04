//returns next trains arriving at a given station

export default function getNextTrain(stationInfo,line){
  console.log("station info")
  console.log(stationInfo)
  let stationCode = stationInfo['Code'];
  let params = {
            "api_key": "a6e753a87f8d49a086f85f165ace7a05",
  };
  let nextTrains = $.ajax({
      url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + stationCode
      + '?'+$.param(params),
      type: "GET",
    }).then((trains) => {
      console.log(trains)
      let finalTrains;
      trains.forEach( (train) =>{
        if(train['Line']==line){
          console.log(train)
          finalTrains.push(train)
        }
      })
      return finalTrains;
  })
  return nextTrains;
}
