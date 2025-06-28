const mongoose = require('mongoose');

const Location = new mongoose.Schema({
    location_id: {
        type: Number,
        required: true,
        unique: true
    },
    location_name:{
        type: String,
        required: true
    },
    state_id: {
        type: Number,
        required: true,
        unique: true
    },
    state:{
        type: String,
        required: true 
    },
    country_name:{
        type: String,
        required: true,
        default: 'India'
    }
},{
    timestamps: true,
    versionKey: false
}); 

const LocationModel = mongoose.model('Location', Location);
module.exports = LocationModel;