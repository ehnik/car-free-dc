import React from 'react';
import styles from './map.css';
import classNames from 'classnames';
import addScript from '../../utils/addScript';
import getWalkTime from '../../utils/Walking/getWalkTime';
import getDirections from '../../utils/getDirections';
import getMetroTime from '../../utils/Metro/getMetroTime';
import getStationList from '../../utils/API/getStationList.js'
import getTimeEstimates from '../../utils/Uber/getTimeEstimates.js'

export default class Map extends React.Component {

  constructor(){
    super()
    this.state={map: null,
    origin: null,
    destination: null,
    ubers: null
    }
    this.initMap = this.initMap.bind(this);
    this.changePoint = this.changePoint.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
  }

  componentDidMount(){
    getStationList();
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

    //adds direction rendering features to state
    this.setState({directionsService: new google.maps.DirectionsService()});
    this.setState({directionsDisplay: new google.maps.DirectionsRenderer()});
    this.state.directionsDisplay.setMap(this.state.map);
  }

  changePoint(location) { //saves coordinates and adds marker corresponding to
    //user-entered destination or origin
    let newState = {}, coordinates = {}, newMarker;

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

  validatePlaceEntry(origin, destination){ //checks for valid autocomplete place values
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

  handleSubmit(event){
    event.preventDefault()
    this.getRoutes();
    getTimeEstimates(this.state.origin, (cars)=> {
      this.setState({ubers: cars['times'].filter(
      (car)=> car.localized_display_name.substr(0,6)=="uberX")
      })
    })
  }


  getRoutes(){ //retrieves metro and walking routes between origin and destination
    let valid = this.validatePlaceEntry()
    if(!valid){
      return false
    }
    else{
      getDirections(this.state.directionsService,this.state.directionsDisplay, this.state.origin,
      this.state.destination)

      getWalkTime(this.state.directionsService, this.state.origin, this.state.destination,
        (data) => {
        this.setState({walkingDuration: data})
      })

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
            <div ref="map" id="map" className={styles.map}/>
            <form onSubmit={(event)=>{this.handleSubmit(event)}}
            className={styles.form}>
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
            <div className={classNames(styles.estimatesContainer)}>
              <h3 className={classNames(styles.estimates,styles.heading)}>Current Time Estimates</h3>
              <div className={classNames(styles.estimates,styles.estimatesFlex)}>
                <div className={styles.estimateText}>
                  <h4 className={styles.subHeading}> Walking </h4>
                  <p> {walkingDuration} </p>
                </div>
                <div className={styles.estimateText}>
                  <h4 className={styles.subHeading}> Metro </h4>
                  <p> {transitDuration} </p>
                </div>
              </div>
            </div>
        </div>
  )}
}
