const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//allow cross-origin requests so front-end can pull from api
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routing for API
app.use('/api',require('./routes/api'))

app.get('/',function(req,res){
  res.send('working');
})

app.listen(3000);
