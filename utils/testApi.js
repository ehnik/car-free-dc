export default function testApi(data) { //loads script
    console.log(data)
    let testCall = $.ajax({
              url: "http://localhost:3000/api/stations",
              dataType: "json",
              contentType: "application/json",
              data: JSON.stringify(data),
              type: "POST",
              error: function(err){
                console.log(err)
              },
              crossDomain: true
    })
    testCall.done(function(data){
      console.log(data)
    })
}
