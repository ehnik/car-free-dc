export default function getWalkTime(origin, destination, callback){

  let request = {
    origin,
    destination,
    travelMode: 'WALKING',
  };

  let service = new google.maps.DirectionsService;

  service.route(request, (response, status) =>{ //requests directions for route
  if (status == 'OK') {
      let walkTime = response.routes[0].legs[0].duration.value;
      callback(walkTime);
    }
  });
}
