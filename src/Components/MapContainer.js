import React from 'react';
import styles from './map.css';
import addScript from '../../utils/addScript'
import getTrainData from '../../utils/wmataApi'

export default class MapContainer extends React.Component {

  constructor(){
    super()
    this.state={map: null,
    duration: null
    }
    this.initMap = this.initMap.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  componentDidMount(){
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script with callback initMap()
    addScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAZpkdkZpwF02oUj-0wPx23vi-qs_FqjcY&callback=initMap&libraries=places')
    // Asynchronously load the WMATA script

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

    //triggers changeLocation function when autocomplete field is changed
    autoDestination.addListener('place_changed', ()=>this.changeLocation('destination'));
    autoOrigin.addListener('place_changed', ()=>this.changeLocation('origin'));

    //adds autocomplete to state
    this.setState({autoDestination});
    this.setState({autoOrigin});

    //adds direction rendering featuers to state
    this.setState({directionsService: new google.maps.DirectionsService()});
    this.setState({directionsDisplay: new google.maps.DirectionsRenderer()});
    this.state.directionsDisplay.setMap(this.state.map);
  }

  changeLocation(location) {
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

    //removes exisiting marker
    let state = this.state
    if(state[location+"Marker"]!=null){
      let marker = state[location+"Marker"]
      marker.setMap(null)
      marker = null;
    }
    //creates new marker and adds it to state
    newMarker = new google.maps.Marker({
      position: coordinates,
      map: this.state.map
    });
    newState[location+"Marker"]=newMarker;

    newState[location]=coordinates

    //adds new origin coordinates and marker data to state
    this.setState(newState)
  }

  clearMarkers(){
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
    console.log(state)
    this.setState({originMarker: null, destinationMarker: null});
  }

  getDirections(event){
    event.preventDefault()

    this.clearMarkers();
    getTrainData();

    var request = {
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: 'WALKING'
    };

    this.state.directionsService.route(request, (response, status) =>{ //requests directions for route
    if (status == 'OK') {
      this.state.directionsDisplay.setDirections(response); //displays directions
      this.setState({durationText: response.routes[0].legs[0].duration.text, duration:
      response.routes[0].legs[0].duration.value})
      console.log(this.state)
      }
    });

  }

  render(){
      return (
        <div>
            <div ref="map" id="map" style={{height: '55%', width: '100%', position: 'absolute'}}/>
            <form onSubmit={(event)=>this.getDirections(event)} style={{height: '50%', width: '50%', position: 'relative'}}>
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
};
