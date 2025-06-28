const Router = require('express').Router();
const {getAllMealTypes} = require('../controller/mealType.controller');

// Route to get all meal types
Router.get('/', getAllMealTypes);

module.exports = Router;