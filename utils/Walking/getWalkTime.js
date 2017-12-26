export default function getWalkTime(service, origin, destination,callback){

  let request = {
    origin,
    destination,
    travelMode: 'WALKING',
  };

  service.route(request, (response, status) =>{ //requests directions for route
  if (status == 'OK') {
      let walkTime = response.routes[0].legs[0].duration.text;
      callback(walkTime);
    }
  });
}
