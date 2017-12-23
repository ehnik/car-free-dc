const express = require('express');
const router = express.Router();

let Station = require('../models/station')


Station.methods(['get', 'put', 'post', 'delete']);
Station.register(router, '/stations');

module.exports = router;
