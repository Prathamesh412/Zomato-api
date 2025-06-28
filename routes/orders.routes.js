const Router = require('express').Router();
const { getOrders, placeOrder } = require('../controller/order.controller');

// Route to get all orders
Router.get('/', getOrders);
Router.post('/placeOrder',placeOrder)

module.exports = Router;