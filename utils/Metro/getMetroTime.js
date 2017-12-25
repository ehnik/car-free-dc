import getStationCode from './getStationCode.js'
import getRouteBasics from './getMetroRouteInfo.js'
import getNextTrain from './getNextTrain.js'

let params = {
          "api_key": "a6e753a87f8d49a086f85f165ace7a05",
};

let firstWalk, duration;

export default function getMetroTime(service, travelMode, origin, destination, callback){

  let request;
  request = {
    origin,
    destination,
    travelMode
  };
  if(travelMode=='TRANSIT'){
    request['transitOptions'] = {
    modes: ['RAIL']
    };
  }

service.route(request, function(response, status){ //get Google Maps route

    let transitAvailable = true;

    if(response['routes'].length==0){ //checks if there are any transit routes available
      transitAvailable = false;
      callback("No metro route available");
      return false;
    }

    let route = response['routes'][0]['legs'][0] //there is only one leg returned for routes with two points

    let routeInfo = getRouteBasics(route);

    if(!routeInfo){
      callback('n/a');
      return false;
    }

    firstWalk = routeInfo['firstWalk'];
    duration = routeInfo['duration']['value'];

    if(!routeInfo['departureStation']){
      callback(routeInfo['duration']['text'])
      return duration
    }
      //get station code for departure station--line must be specified, as some
      //stations have more than one code

    let stationCode = getStationCode(routeInfo['departureStation'],routeInfo['line'])

    let finalDuration = stationCode.then( (stationInfo) =>
        getNextTrain(stationInfo)
        )
        .then( (response) => {
          let trains = response['Trains'];
          let nextTrain; //arrival time for next viable train
          for(var x = 0; x<trains.length; x++){
            //WMATA arrival data is in minutes; must convert to seconds to be compatible with Google data
            nextTrain = parseInt(trains[x]['Min']);

            if(nextTrain=='ARR'||nextTrain=='BRD'||nextTrain==""){
              nextTrain = 0;
            }
            else{
              nextTrain *= 60
            }
            if(firstWalk<=nextTrain){ //find first train that will arrive after time to walk to station
              break;
            }
          }
          duration = parseInt(duration) + parseInt(nextTrain)

          let durationHours = Math.floor(duration / 3600);
          let durationMinutes = Math.floor(duration % 3600 / 60);
          let hourOrHours = " hours ";
          if (durationHours==1){
            hourOrHours = " hour "
          }

          let nextTrainMinutes = Math.floor(nextTrain % 3600 / 60)
          duration = durationHours.toString() + hourOrHours +
          durationMinutes.toString() + " minutes (next train in: " + nextTrainMinutes.toString() + " minutes)";

          callback(duration);
        })
      })
    }
//)
//}
