import React from 'react';
import styles from './map.css';
import addScript from '../../utils/addScript'

export default class MapContainer extends React.Component {

  constructor(){
    super()
    this.state={map: null,
    duration: null
    }
    this.initMap = this.initMap.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    let marker = new google.maps.Marker({
        position: dcCoords,
        map: map
    });


    //initialize autocomplete features for orign/destination fields
    const autoDestination = new google.maps.places.Autocomplete(this.refs.autoDestination);
    const autoOrigin = new google.maps.places.Autocomplete(this.refs.autoOrigin);

    autoDestination.addListener('place_changed', ()=>this.changeLocation('destination'));
    autoOrigin.addListener('place_changed', ()=>this.changeLocation('origin'));

    //adds autocomplete to state
    this.setState({autoDestination});
    this.setState({autoOrigin});

    //adds direction rendering featuers to state
    //this.setState({directionsService: new google.maps.DirectionsService()});
    //this.setState({directionsDisplay: new google.maps.DirectionsRenderer()});

    //this.state.directionsDisplay.setMap(this.state.map);
    //this.getDirections();
  }

  changeLocation(location) {
    let newState = {}
    let coordinates = {};
    let map = this.state.map;

    if(location=='destination'){
      coordinates['lat'] = this.state.autoDestination.getPlace().geometry.location.lat();
      coordinates['lng'] = this.state.autoDestination.getPlace().geometry.location.lng();
    }
    else{
      coordinates['lat'] = this.state.autoOrigin.getPlace().geometry.location.lat();
      coordinates['lng'] = this.state.autoOrigin.getPlace().geometry.location.lng();
    }

    let marker = new google.maps.Marker({
        position: coordinates,
        map: map
    });
    newState[location]=coordinates
    newState = Object.assign({}, newState, {map})
    this.setState(newState)
  }


  getDirections(){

    var request = {
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: 'DRIVING'
    };

    this.state.directionsService.route(request, (response, status) =>{ //requests directions for route
    if (status == 'OK') {
      this.state.directionsDisplay.setDirections(response); //displays directions
      this.setState({duration: response.routes[0].legs[0].duration})
      }
    });
  }


  handleSubmit(event) {
    event.preventDefault();
  }

  render(){
      return (
        <div>
            <div ref="map" id="map" style={{height: '55%', width: '100%', position: 'absolute'}}/>
            <form onSubmit={this.handleSubmit} style={{height: '50%', width: '50%', position: 'relative'}}>
              <label>
                From:
                <input id="origin" type="text" ref="autoOrigin"/>
              </label>
              <label>
                To:
                <input id="destination" type="text" ref="autoDestination"/>
              </label>
              <input type="submit" value="Submit"/>
            </form>
          <p>Hi</p>
        </div>
    );
  }
};
