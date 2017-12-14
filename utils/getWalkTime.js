export default function getWalkTime(origin, destination){

  let request = {
    origin,
    destination,
    travelMode: 'WALKING',
  };

  let service = new google.maps.DirectionsService;

  return new Promise(function(resolve,reject) {
    service.route(request, (response, status) =>{ //requests directions for route
      if (status == 'OK') {
        resolve(response.routes[0].legs[0].duration.value)
      }
      else{
        console.log("hi")
        reject(status)
      }
    });
  })
}
