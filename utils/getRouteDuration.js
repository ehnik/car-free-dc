import getStationCode from './getStationCode.js'
import getRouteBasics from './getRouteBasics.js'
import getNextTrain from './getNextTrain.js'

let params = {
          "api_key": "a6e753a87f8d49a086f85f165ace7a05",
};

let firstWalk, duration;

export default function getRouteDuration(service, travelMode, origin, destination, callback){

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
    console.log(response)

    let transitAvailable = true;

    if(response['routes'].length==0){
      transitAvailable = false;
      callback("no route");
      return false;
    }

    //if(transitAvailabe){
      let route = response['routes'][0]
      let walkingRoute = false;
      let routeInfo;
      route = route['legs'][0]; //there is only one leg returned for routes with two points
      let routeSteps = route['steps'];
      if(routeSteps.length==1&&routeSteps[0]['travel_mode']=='WALKING'){
        walkingRoute = true
      }
  //  }

    routeInfo = getRouteBasics(route);
    console.log("routeInfo")
    console.log(routeInfo)

    if(!routeInfo){
      console.log('no route')
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
          console.log(response)
          let trains = response['Trains'];
          let arrivalTime = trains[0]['Min'];
          if(arrivalTime=='ARR'||arrivalTime=='BRD'){
            arrivalTime = 0;
          }
          else{
            //WMATA arrival data is in minutes; convert to seconds to be compatible with Google data
            arrivalTime = parseInt(arrivalTime)*60
          }
          let x = 0;
          while(arrivalTime<=firstWalk){ //find first train that will arrive after time to walk to station
            x++;
            arrivalTime = parseInt(trains[x]['Min'])*60;
          }
          duration = (duration + arrivalTime)/60
          let hours = Math.floor(duration / 3600);
          let minutes = Math.floor(duration % 3600 / 60);
          duration = hours.toString() + " hour(s) and " + minutes.toString() + " minutes";
          callback(duration);
        })
      })
    }
//)
//}
