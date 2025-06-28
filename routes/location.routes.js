const Router = require('express').Router();
const { getAllLocations } = require('../controller/location.controller');

// Route to get all locations
Router.get('/', getAllLocations);

module.exports = Router;