//getStationCode
export default function getStationCode(name,line,callback) {

  let lineNum = "LineCode1";

  switch(line) {
    case 'Green':
        line = 'GR'
        break;
    case 'Silver':
        line = 'SV'
        break;
    case 'Orange':
        line = 'OR'
        break;
    case 'Red':
        line = 'RD'
        break;
    case 'Blue':
        line = 'BL'
        break;
    case 'Yellow':
        line = 'YL'
        break;
  }

    let wordEnd;

    if(name.indexOf(" ")==-1){
      wordEnd = name.length-1
    }
    else{
      wordEnd = name.indexOf(" ")
    }

    let searchName = "/" + name.substr(0, wordEnd) +"/i" //searches for name based on first word

    console.log(name)

    if(searchName=='/Pentagon/i'){
      if(name=='Pentagon City Station'){
        searchName = /pentagon\scity/i
      }
    }

    if(searchName=='/Farragut/i'){ //for stations sharing first word, seach whole name
      if(name=='Farragut West Station'){
        searchName = /farragut\swest/i
      }
      else{
        searchName = /farragut\snorth/i
      }
    }

    console.log(searchName)
    console.log(line)


    $.ajax({
              url: "http://localhost:3000/api/stations?Name__regex="+searchName+
              "&" + lineNum + "__regex=/" + line + "/",
              dataType: "json",
              contentType: "application/json",
              type: "GET",
              error: (err)=>console.log(err),
              crossDomain: true
            })
            .then( (res)=>{
              console.log("response is: " +res.length)
              if(res.length>0){
                console.log('returning')
                return res
              }
              else{
                console.log('trying second call')
                lineNum = "lineCode2";
                $.ajax({
                    url: "http://localhost:3000/api/stations?Name__regex="+searchName+
                    "&" + lineNum + "__regex=/" + line + "/",
                    dataType: "json",
                    contentType: "application/json",
                    type: "GET",
                    error: (err)=>console.log(err),
                    crossDomain: true
                })
              .then((res)=>{
                console.log("second call")
                if(res.length>0){
                  return res
                }
              })
            }
          })
  }
