const Router = require('express').Router();
const {getRestaurantData, filterMeal} = require('../controller/restaurantData.controller');

// Define the route for getting restaurant data
Router.get('/', getRestaurantData);
Router.get('/filter/:meal', filterMeal );

// Export the router
module.exports = Router;