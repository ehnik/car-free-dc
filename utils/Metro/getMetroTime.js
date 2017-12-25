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
    console.log("route")
    console.log(route)
    console.log(response['routes'][0])
    /*
    let walkingRoute = false;
    let routeInfo;
    let routeSteps = route['steps'];
    if(routeSteps.length==1&&routeSteps[0]['travel_mode']=='WALKING'){
      walkingRoute = true
    }*/

    let routeInfo = getRouteBasics(route);
    console.log("routeInfo")
    console.log(routeInfo)

    if(!routeInfo){
      console.log('no route')
      callback('n/a');
      return false;
    }

    firstWalk = routeInfo['firstWalk'];
    console.log("first walk")
    console.log(firstWalk)
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
          console.log("in here")
          console.log(response)
          let trains = response['Trains'];
          console.log("trains")
          console.log(trains)
          console.log(firstWalk)
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

            console.log("next train")
            console.log(nextTrain)
            if(firstWalk<=nextTrain){ //find first train that will arrive after time to walk to station
              console.log("breaking at: " + nextTrain)
              break;
            }
          }
          console.log("after loop")
          console.log(duration)
          console.log(nextTrain)
          duration = parseInt(duration) + parseInt(nextTrain)

          let durationHours = Math.floor(duration / 3600);
          let durationMinutes = Math.floor(duration % 3600 / 60);
          let hourOrHours = " hours ";
          if (durationHours==1){
            hourOrHours = " hour "
          }

          let nextTrainMinutes = Math.floor(nextTrain % 3600 / 60)
          console.log("next train coming")
          console.log(nextTrainMinutes)
          duration = durationHours.toString() + hourOrHours +
          durationMinutes.toString() + " minutes (next train in: " + nextTrainMinutes.toString() + " minutes)";

          callback(duration);
        })
      })
    }
//)
//}
