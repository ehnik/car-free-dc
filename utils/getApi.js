export default function getApiKey(url) { //loads script
    console.log(data)
    let getCall = $.ajax({
              url: "http://localhost:3000/api/" + url,
              dataType: "json",
              contentType: "application/json",
              type: "GET",
              error: function(err){
                console.log(err)
              },
              crossDomain: true
    })
    return getCall;
}
