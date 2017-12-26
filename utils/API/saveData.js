//Sends post request to backend API

export default function saveData(data,url) { //loads script
    let postRequest = $.ajax({
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
}
