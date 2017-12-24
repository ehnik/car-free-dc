export default function postApi(data,url) { //loads script
    console.log(data)
    let testCall = $.ajax({
              url: "http://localhost:3000/api/" + url,
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
