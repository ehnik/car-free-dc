import React from 'react';
import styles from './map.css';
import addScript from '../../utils/addScript';
import getWalkTime from '../../utils/getWalkTime';
import getDirections from '../../utils/getDirections';
import getStationCode from '../../utils/getStationCode';
import getRailRoute from '../../utils/getRailRoute';
import getRailTripDuration from '../../utils/getRailTripDuration';

//import {getNextTrain, getClosestStation} from '../../utils/wmataData'

export default class MapContainer extends React.Component {

  constructor(){
    super()
    this.state={map: null,
    origin: null,
    destination: null
    }
    this.initMap = this.initMap.bind(this);
    this.changePoint = this.changePoint.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.getClosestMetros = this.getClosestMetros.bind(this);
  }

  componentDidMount(){
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script with callback initMap()
    addScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAZpkdkZpwF02oUj-0wPx23vi-qs_FqjcY&callback=initMap&libraries=places')
  }

  initMap() {

    let dcCoords = {lat: 38.8951100, lng: -77.0363700};

    //initialize map
    let map = new google.maps.Map(document.getElementById('map'), {
      center: dcCoords, //coordinates of DC
      zoom: 12
    });
    this.setState({map});

    //initialize autocomplete features for orign/destination fields
    const autoDestination = new google.maps.places.Autocomplete(this.refs.autoDestination);
    const autoOrigin = new google.maps.places.Autocomplete(this.refs.autoOrigin);

    //triggers changePoint function when autocomplete field is changed
    autoDestination.addListener('place_changed', ()=>this.changePoint('destination'));
    autoOrigin.addListener('place_changed', ()=>this.changePoint('origin'));

    //adds autocomplete to state
    this.setState({autoDestination});
    this.setState({autoOrigin});

    //adds direction rendering featuers to state
    this.setState({directionsService: new google.maps.DirectionsService()});
    this.setState({directionsDisplay: new google.maps.DirectionsRenderer()});
    this.state.directionsDisplay.setMap(this.state.map);
  }

  changePoint(location) {
    //saves autcomplete values

    let newState = {}
    let coordinates = {};
    let newMarker;

    if(location=='destination'){
      coordinates['lat'] = this.state.autoDestination.getPlace().geometry.location.lat();
      coordinates['lng'] = this.state.autoDestination.getPlace().geometry.location.lng();
    }
    else{
      coordinates['lat'] = this.state.autoOrigin.getPlace().geometry.location.lat();
      coordinates['lng'] = this.state.autoOrigin.getPlace().geometry.location.lng();
    }

    //removes marker if one exists
    let state = this.state
    if(state[location+"Marker"]!=null){
      let marker = state[location+"Marker"]
      marker.setMap(null)
      marker = null;
    }

    //creates new marker for point and adds it to state
    newMarker = new google.maps.Marker({
      position: coordinates,
      map: this.state.map
    });
    newState[location+"Marker"]=newMarker;

    newState[location]=coordinates

    //adds new coordinates and marker data to state
    this.setState(newState)
  }

  clearMarkers(){
    //clears all markers on map
    let state = this.state;
    let marker;
    if(state['destinationMarker']!=null){
      marker = state['destinationMarker']
      marker.setMap(null)
      marker = null;
    }
    if(state['originMarker']!=null){
      marker = state['originMarker']
      marker.setMap(null)
      marker = null;
    }
    //creates new marker and adds it to state
    this.setState({originMarker: null, destinationMarker: null});
  }

  handleSubmit(event){
    event.preventDefault()
    this.getClosestMetros();
  }

  validateEntry(){
    if(this.state.destination==null){
      alert("Please enter a valid destination.")
      return false
    }

    if(this.state.origin==null){
      alert("Please enter a valid starting point.")
      return false
    }
  }

  getClosestMetros(event){
    console.log("hmr testtttthghgh")
    let valid = this.validateEntry()
    if(!valid){
      return false
    }
    else{
      var originRequest = { //request for all metro stations close to origin
        location: this.state.origin,
        radius: '2414',
        query: 'metro station'
        };

      var destinationRequest = { //request for all metro stations close to origin
        location: this.state.origin,
        radius: '2414',
        query: 'metro station'
        };
    }

    this.originStationCodes = [];
    this.destinationStationCodes = [];
    //logs station info and walk time to origin to station

    let saveStations = (results, status, saveArray)=>{
      if(status=='OK'){
          let allStations = results;
          for(var x = 2; allStations.length; x++){
            let x = 0;
            let stationLocation = {lat: allStations[x].geometry.location.lat(),
              lng: allStations[x].geometry.location.lng()};
          }
      }
      console.log(this);
    }

    let saveStationsWrapperOrigin = (results,status)=>{
      saveStations(results, this.originStationCodes)
    }
    let saveStationsWrapperDestination = (results,status)=>{
      saveStations(results, status, this.destinationStationCodes)
    }
    //requests data from API
    let placesService = new google.maps.places.PlacesService(this.state.map);
    placesService.textSearch(originRequest, saveStationsWrapperOrigin)
    placesService.textSearch(destinationRequest, saveStationsWrapperDestination)
}
  render(){
      return (
        <div>
            <div ref="map" id="map" style={{height: '55%', width: '100%', position: 'absolute'}}/>
            <form onSubmit={(event)=>{this.handleSubmit(event)}}
            style={{height: '50%', width: '50%', position: 'relative'}}>
              <label>
                From:
                <input id="origin" type="text" ref="autoOrigin"/>
              </label>
              <label>
                To:
                <input id="destination" type="text" ref="autoDestination"/>
              </label>
              <input type="submit" value="Caclulate directions"/>
            </form>
          <p>Hi</p>
        </div>
    );
  }
}
