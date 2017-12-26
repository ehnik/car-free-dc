//Retrieves station code from database

//Unfortunately, Google and WMATA have slightly different naming conventions
//for metro stations. Therefore, the WMATA-populated
//station database can't be filtered using Google API-generated station names.
//However, the first word of the station is consistent across APIs, so
//it is possible to search the database with the first word of the Google-generated
//name. There are two pairs of stations (Pentagon and Pentagon City;
//Farragut West and Farragut North) with identical first words; the function treats
//these cases individually.

export default function getStationCode(name,line,callback) {

  let lineNum = "LineCode1";

  switch(line) {
    case 'Green':
        line = 'GR'
        break;
    case 'Silver':
        line = 'BL'
        break;
    case 'Orange':
        line = 'BL'
        break;
    case 'Red':
        line = 'RD'
        break;
    case 'Blue':
        line = 'BL'
        break;
    case 'Yellow':
        line = 'GR'
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

    let stationCode = $.ajax({
              url: "http://localhost:3000/api/stations?Name__regex="+searchName+
              "&" + lineNum + "__regex=/" + line + "/",
              dataType: "json",
              contentType: "application/json",
              type: "GET",
              error: (err)=>console.log(err),
              crossDomain: true
            })
    return stationCode;
  }
