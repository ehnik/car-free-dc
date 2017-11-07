export default function getDirections(origin, destination,mode){

  var request = {
    origin,
    destination,
    travelMode: mode,
  };

  let service = new google.maps.DirectionsService()
  let display = new google.maps.DirectionsRenderer()

  service.route(request, (response, status) =>{ //requests directions for route
  if (status == 'OK') {
    display.setDirections(response); //displays directions
    }
  });

}
