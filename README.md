Car Free DC shows how long it will take to reach a destination by walking or
taking the DC metro rail system.

The fastest metro rail route is calculated by combining the route duration estimate
returned by Google Maps' Directions service and real-time Washington Metro
Transit Authority (WMATA) rail data. This provides a more accurate time
estimate, as Google Maps' current algorithm does not include train arrival time.
(Google will likely change this in the future, as they have for many other US
cities. But for now, the data is missing.)

Please follow the instructions below to run this application on your local machine:

1) Install MongoDB and run mongod on the CLI for handling database requests.

2) Install dependencies and run node server.js and
node server_api.js to start up the React app and backend API.

----
Additional notes:

Note: the station data is added into the MongoDB backend through the getStationList
function, which is called when the Map component mounts. Since the component only
mounts once, this works well enough to seed the database with the requisite data.
I will be adding a Node file that can be run separately to fill in this data, as
well.

Currently adding the following features to this app:

--The WMATA API key is currently exposed. Code exists in the Utils/API folder
to add the key to the application's backend; I will be rewriting the rest of the
React code to request the API key from the backend.

--I will also be adding in a time estimate for Uber trips. Uber's API has a method
that returns the estimated Uber pickup time at any given location. I will therefore
combine this arrival estimate and Google Maps' current driving estimate for
an Uber estimate.
