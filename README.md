To run this application, install dependencies and run "nodemon server.js" and
"nodemon server_api.js" to run the react app and station list backend API.

1) This application accesses station data via a small api.

//fastest metro route is calculated by combining recommended google metro routes
and real-time WMATA rail data. Since google's algorithm appears to factor in
average waiting time, this app.

At the moment, a trip that requires transferring lines factors in the wait time
(if available)


getStationCode()
//Unfortunately, Google and WMATA have slightly different naming conventions
//for metro stations. Therefore, the WMATA-populated
//station database can't be filtered using Google API-generated station names.
//However, the first word of the station is consistent across APIs, so
//it works to search the database with the first word of the Google-generated
//name. There are two pairs of stations (Pentagon and Pentagon City;
//Farragut West and Farragut North) with identical first words, so the
//entire term is used to search in these cases (these stations are consistent
//in both APIs)
