const express = require('express');
const router = express.Router();

let Station = require('../models/station')
let ApiKey = require('../models/apiKey')


Station.methods(['get', 'put', 'post', 'delete']);
Station.register(router, '/stations');

ApiKey.methods(['get', 'put', 'post', 'delete']);
ApiKey.register(router, '/apikeys');

module.exports = router;
