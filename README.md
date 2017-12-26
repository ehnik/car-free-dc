# Car-Free DC

Car-Free DC shows car-less DC residents how long it will take to get from Point A to Point B.
Real-time estimates are currently available for walking or taking the DC metro rail system.

The fastest metro rail route is calculated by combining the route duration estimate
returned by Google Maps' Directions service and real-time Washington Metro
Transit Authority (WMATA) rail data. This provides a more accurate time
estimate, as Google Maps' current algorithm does not include train arrival time.
(Google will likely change this in the future, as they have for many other US
cities. But for now, the data is missing.)

Please note that accurate metro estimates are currently only available for
trips within the DC city limits. Estimates for trips within the larger DMV are will
be available in the next version.

## Instructions

Please follow the instructions below to run this application on your local machine:

1) Install MongoDB and run $ mongod on the CLI for handling database requests.

2) Install dependencies and run $ node server.js and
$ node server_api.js to start up the React app and backend API.

## Additional notes

Currently adding the following features to this app:

* The WMATA API key is currently exposed. Code exists in the Utils/API folder
to add the key to the application's backend; I will be rewriting the rest of the
React code to request the API key from the backend.

* I will also be adding in a time estimate for Uber trips. Uber's API has a method
that returns the estimated Uber pickup time at any given location. I will therefore
combine this arrival estimate and Google Maps' current driving estimate for
an Uber estimate.

* The station data is added into the MongoDB backend through the getStationList
function, which is called when the Map component mounts. Since the component only
mounts once, this seeds the database with the requisite data.
I will be adding a Node file that can be run separately to fill in this data, as
well.
