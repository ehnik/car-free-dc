//getStationCode
export default function getStationCode(name,line,callback) {
  //Unfortunately, Google and WMATA have slightly different naming conventions
  //for metro stations. Therefore, the WMATA-populated
  //station database can't be filtered using Google API-generated station names.
  //However, the first word of the station is consistent across APIs, so
  //it works to search the database with the first word of the Google-generated
  //name. There are two pairs of stations (Pentagon and Pentagon City;
  //Farragut West and Farragut North) with identical first words, so the
  //entire term is used to search in these cases (these stations are consistent
  //in both APIs)

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

    let searchName = name.substr(0, wordEnd)
    if(searchName=='Pentagon'||searchName=='Farragut'){
      searchName = name;
    }

    console.log(searchName)
    console.log(line)

    let testCall = $.ajax({
              url: "http://localhost:3000/api/stations?Name__regex=/"+searchName+
              "/i&LineCode1__regex=/" + line + "/",
              dataType: "json",
              contentType: "application/json",
              type: "GET",
              error: function(err){
                console.log(err)
              },
              crossDomain: true
    })
    return testCall;
  }
