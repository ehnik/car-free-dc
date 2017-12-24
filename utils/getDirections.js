//retrieves and displays directions from Google Maps

export default function getDirections(service,origin, destination,mode){

  var request = {
    origin,
    destination,
    travelMode: mode,
  };

  let display = new google.maps.DirectionsRenderer()

  service.route(request, (response, status) =>{ //requests directions for route
  if (status == 'OK') {
    display.setDirections(response); //displays directions
    }
  });

}
