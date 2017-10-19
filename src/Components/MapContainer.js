import React from 'react';
import styles from './map.css';
import addScript from '../../utils/addScript'

export default class MapContainer extends React.Component {

  constructor(){
    super()
    this.state={map: null,
    directionsService: null,
    directionsDisplay: null,
    origin: "",
    destination: "",
    duration: null
    }
    this.initMap = this.initMap.bind(this)
    this.getDirections = this.getDirections.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script with callback initMap()
    addScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAZpkdkZpwF02oUj-0wPx23vi-qs_FqjcY&callback=initMap')
  }

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 5
    });
    this.setState({map: map, origin: {lat: 37.7699298, lng: -122.4469157},
    destination: {lat: 31.7699298, lng: -110.4469157}})
    this.setState({directionsService: new google.maps.DirectionsService()});
    this.setState({directionsDisplay: new google.maps.DirectionsRenderer()});
    this.state.directionsDisplay.setMap(this.state.map);
    this.getDirections();
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

  handleChange(key) {
    return (event)=>{
      console.log("key " + key)
      console.log("event "  + event)
      var locations = {};
      locations[key] = event.target.value;
      this.setState(locations);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render(){
      return (
        <div>
            <div ref="map" id="map" style={{height: '50%', width: '50%', position: 'absolute'}}/>
            <form onSubmit={this.handleSubmit} style={{height: '50%', width: '50%', position: 'relative'}}>
              <label>
                From:
                <input id="origin" type="text" onChange={this.handleChange('origin')} value={this.state.origin}/>
              </label>
              <label>
                To:
                <input id="destination" type="text" onChange={this.handleChange('destination')} value={this.state.destination}/>
              </label>
              <input type="submit" value="Submit"/>
            </form>
          <p>Hi</p>
        </div>
    );
  }
};
