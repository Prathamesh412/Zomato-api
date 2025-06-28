const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    cost:{
        type: Number,
        required: true,
        default: 0
    },
    menuItem:[{
        type:String,
        required: true,
        ref: 'RestaurantMenu' // Assuming this references the RestaurantMenu model
    }],
    status:{
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
   },{
    timestamps: true,
    versionKey: false
});

const Order = mongoose.model('Order', orderSchema,"Orders");
module.exports = Order;