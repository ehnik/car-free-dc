//retrieves and displays directions between two points

export default function getDirections(service,display,origin, destination){

  var request = {
    origin,
    destination,
    travelMode: 'WALKING',
  };

  service.route(request, (response, status) =>{ //requests directions for route
  if (status == 'OK') {
    display.setDirections(response); //displays directions
    }
  });

}
