const mongoose = require('mongoose');

const mealTypeSchema = new mongoose.Schema({
    mealtype_id: {
        type: Number,
        required: true,
        unique: true
    },
    meal_type:{
        type: String,
        required: true,
        unique: true
    },
    content:{
        type: String,
        default: 'Start  your day with this option'
    },
    meal_image:{
        type: String,
        default: 'https://b.zmtcdn.com/data/mealtypes/Breakfast.png'
    }
},{
    timestamps: true,
    versionKey: false
}); 

const MealType = mongoose.model('MealType', mealTypeSchema, "mealTypes");
module.exports = MealType;