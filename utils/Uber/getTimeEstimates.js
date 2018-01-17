//returns arrival time estimates for closest UberX

export default function getTimeEstimates(origin, callback){

let nextCarCall = $.ajax({
    url: "https://api.uber.com/v1.2/estimates/time",
    data: {
    "start_latitude": origin.lat, "start_longitude": origin.lng,
    "server_token": "GYq7BjNg0k8C3-EqCvUJHQRE9QWAZktopVGTrir9"},
    error: (err) => console.log(err)
    })
    .then( (resp) => {
      callback(resp)
    })
}
