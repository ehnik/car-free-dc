//verifies that route is a metro route and returns essential information about
//route for use in travel time estimate

export default function getMetroRouteInfo(route){

  let departureStations = [], arrivalStations = [], lines = [], instructions = [];
  let firstWalk = null;
  let routeSteps = route['steps'], duration = route['duration'];

  for(let x = 0; x<routeSteps.length; x++){
    let step = routeSteps[x];
    if(step['travel_mode']=='WALKING'){ //populates if first step of route is a walk
      if(x==0){
        firstWalk = step['duration']['value'];
      }
    }
    else if (step['instructions'].charAt(0)=='M'){ //verifies that route is via metro (not bus)
      departureStations.push(step['transit']['departure_stop']['name'])
      arrivalStations.push(step['transit']['arrival_stop']['name'])
      lines.push(step['transit']['line']['short_name'])
    }
    else{ //returns empty if bus route is found, as this means no metro route is available
      return false;
    }
  }

  if(departureStations.length==0){ //if no stations are logged, route is not a metro route
    return false;
  }
  let result = {'departureStation': departureStations[0],
    'arrivalStation': arrivalStations[0],
    'line': lines[0],
    firstWalk,
    duration
  }
  return result;
}
