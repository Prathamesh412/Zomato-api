const Router = require('express').Router();
const {getAllRestaurantMenus} = require('../controller/restaurantMenu.controller'); 

// Route to get all restaurant menus
Router.get('/', getAllRestaurantMenus);

module.exports = Router;
