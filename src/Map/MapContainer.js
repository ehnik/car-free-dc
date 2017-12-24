import React from 'react';
import styles from './map.css';
import addScript from '../../utils/addScript';
import getWalkTime from '../../utils/Walking/getWalkTime';
import getDirections from '../../utils/getDirections';
import getMetroTime from '../../utils/Metro/getMetroTime';
//import getStationCode from '../../utils/Metro/getStationCode';
//import addApiKey from '../../utils/addApiKey';

export default class MapContainer extends React.Component {

  constructor(){
    super()
    this.state={map: null,
    origin: null,
    destination: null,
    walkingDuration: null
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

    //adds autocomplete fields to state
    this.setState({autoDestination});
    this.setState({autoOrigin});

    //adds direction rendering featuers to state
    this.setState({directionsService: new google.maps.DirectionsService()});
    this.setState({directionsDisplay: new google.maps.DirectionsRenderer()});
    this.state.directionsDisplay.setMap(this.state.map);
  }

  changePoint(location) { //saves coordinates and adds marker corresponding to
    //user-entered destination or origin
    let newState = {}, coordinates = {}, newMarker;
    console.log("state: " + this.state)

    if(location=='destination'){
      coordinates['lat'] = this.state.autoDestination.getPlace().geometry.location.lat();
      coordinates['lng'] = this.state.autoDestination.getPlace().geometry.location.lng();
    }
    else{
      coordinates['lat'] = this.state.autoOrigin.getPlace().geometry.location.lat();
      coordinates['lng'] = this.state.autoOrigin.getPlace().geometry.location.lng();
    }

    //removes marker if one exists for this endpoint
    if(this.state[location+"Marker"]){
      let marker = this.state[location+"Marker"]
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

  clearMarkers(){  //clears all markers on map
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
      return false;
    }
    else if(this.state.origin==null){
      alert("Please enter a valid starting point.")
      return false;
    }
    else{
      return true;
    }
  }

  getClosestMetros(){
    let valid = this.validateEntry()
    if(!valid){
      return false
    }
    else{

      getWalkTime(this.state.directionsService, this.state.origin, this.state.destination,
        (data) => {
        this.setState({walkingDuration: data})
      })
      /*getRouteInfo(this.state.directionsService, 'WALKING',
      this.state.origin, this.state.destination,
          (data) => {
          this.setState({walkingDuration: data})
        });*/

      getMetroTime(this.state.directionsService, 'TRANSIT', this.state.origin, this.state.destination,
          (data) => {
          this.setState({transitDuration: data})
      });
    }
  }


  render(){
      let walkingDuration = this.state.walkingDuration
      let transitDuration = this.state.transitDuration
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
          <h3 style={{top: '55%', width: '50%', position: 'absolute'}}>Current Time Estimates</h3>
          <p style={{top: '70%', width: '50%', position: 'absolute'}}>Walking: {walkingDuration}</p>
          <p style={{top: '75%', width: '50%', position: 'absolute'}}>Metro: {transitDuration}</p>
        </div>
  )}
}
