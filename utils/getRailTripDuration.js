export default function getRailTripDuration(startCode,endCode){

  var params = {
    "api_key": "a6e753a87f8d49a086f85f165ace7a05",
    // Request parameters
    "FromStationCode": startCode,
    "ToStationCode": endCode,
  };

  $.ajax({
    url: "https://api.wmata.com/Rail.svc/json/jSrcStationToDstStationInfo?" + $.param(params),
    type: "GET"
  })
  .then(function(data){
    console.log(data)
  })
}
