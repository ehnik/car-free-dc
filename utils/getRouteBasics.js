//returns basic information about route (names of transit stations and rain lines used,
//duration of walking time) for use in travel time estimate

export default function getRouteBasics(route){

  let departureStations = [], arrivalStations = [], lines = [];
  let firstWalk = null;
  let routeSteps = route['steps'], duration = route['duration'];

  for(let x = 0; x<routeSteps.length; x++){
    let step = routeSteps[x];
    if(step['travel_mode']=='WALKING'){ //populates if first step of route is a walk
      if(x==0){
        firstWalk = step;
      }
    }
    else if (step['instructions'].charAt(0)=='M'){ //verifies that route is on Metro (not bus)
      departureStations.push(step['transit']['departure_stop']['name'])
      arrivalStations.push(step['transit']['arrival_stop']['name'])
      lines.push(step['transit']['line']['short_name'])
    }
    else{
      console.log("non-rail or walking route")
      return false;
    }
  }

  let result = {};
  if(departureStations.length>0){
    result['departureStation'] = departureStations[0]
    result['arrivalStation'] = arrivalStations[0]
    result['line'] = lines[0]
  }
  result['firstWalk'] = firstWalk;
  result['duration'] = duration;
  return result;
}
