//Retrieves station code from database

//Unfortunately, Google and WMATA have slightly different naming conventions
//for metro stations. Therefore, the WMATA-populated
//station database can't be filtered using Google API-generated station names.
//However, the first word of the station is consistent across APIs, so
//it is possible to search the database with the first word of the Google-generated
//name. There are two pairs of stations (Pentagon and Pentagon City;
//Farragut West and Farragut North) with identical first words; the function treats
//these cases individually.

import convertLineColor from './convertLineColor.js'

export default function getStationCode(name,line) {

    line = convertLineColor(line)

    let wordEnd;

    if(name.indexOf(" ")==-1){
      wordEnd = name.length-1
    }
    else{
      wordEnd = name.indexOf(" ")
    }

    let searchName = "/" + name.substr(0, wordEnd) +"/i" //searches for name based on first word

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

    let result = (lineCode)=>{return $.ajax({
                  url: "http://localhost:3000/api/stations?Name__regex="+searchName+
                  "&"+lineCode+"__regex=/" + line + "/",
                  dataType: "json",
                  contentType: "application/json",
                  type: "GET",
                  error: (err)=>console.log(err),
                  crossDomain: true
                })
              }

    let resultArray = [result('LineCode1'),result('LineCode2'),result('LineCode3')];
    let stationCode = $.when(...resultArray).then((...data)=>{
    let code;
    data.forEach( (result) => {
      if(result[0].length>0){
        code = result[0][0]
      }
    })
    return code
  })
    return stationCode;
}
