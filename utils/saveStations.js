import getWalkTime from './getWalkTime';
import getStationCode from './getStationCode';
import getRailTripDuration from './getRailTripDuration';

export default function saveStations(saveArray){

    let allStations = results;
    console.log(allStations)
    let x = 0;
    let overTwentyMin = false;
    while(!overTwentyMin&&x<=3){
      let stationLocation = {lat: allStations[x].geometry.location.lat(),
        lng: allStations[x].geometry.location.lng()};
        getWalkTime(this.state.origin,stationLocation,(walkTime)=>{
          if(walkTime<=1200){//logs all stations within 30min walk
            //this.originStations.push(stationLocation);
            getStationCode(stationLocation, (stationCode)=>{
              this.originStationCodes.push(stationCode)
            })
          }
          else{
            overTwentyMin = true;
          }
      })
      x++;
    }
    getRailTripDuration(this.originStation, this.state.destination)
}
