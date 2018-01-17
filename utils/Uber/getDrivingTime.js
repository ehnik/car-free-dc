export default function getDriveTime(service, origin, destination,callback){

  let request = {
    origin,
    destination,
    travelMode: 'DRIVING',
  };

  service.route(request, (response, status) =>{ //requests directions for route
  if (status == 'OK') {
      let driveTime = response.routes[0].legs[0].duration.text;
      callback(driveTime);
    }
  });
}
