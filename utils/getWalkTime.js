export default function getWalkTime(origin, destination){

  let request = {
    origin,
    destination,
    travelMode: 'WALKING',
  };

  let service = new google.maps.DirectionsService;

  //console.log(station)

  service.route(request, (response, status) =>{ //requests directions for route
  if (status == 'OK') {
      let walkTime = response.routes[0].legs[0].duration.value;
      console.log(walkTime)
      callback(walkTime);
    }
  });
}
