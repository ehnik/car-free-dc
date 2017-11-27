export default function getRailRoute(origin,destination){

var directionsService = new google.maps.DirectionsService();

var request = {
  origin,
  destination,
  travelMode: 'TRANSIT',
  transitOptions: {
    modes: ['RAIL']
  }
}

directionsService.route(request, function(response, status) {
    console.log("calculating rail route")
    if (status == "OK") {
      console.log(response.routes[0])
      for(var x=1;x<response.routes[0].legs[0].steps.length;x++){
        if(response.routes[0].legs[0].steps[x].travel_mode=='TRANSIT'){
          console.log("more than one transit leg")
        }
      }
    }
});
}
