const mongoose = require('mongoose');

const restaurantMenuSchema = new mongoose.Schema({
    menu_id:{
        type: Number,
        required: true,
        unique: true
    },
    menu_name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        default: 'No description available'
    },
    menu_image:{
        type: String,
        required: true,
        default: 'https://b.zmtcdn.com/data/dish_photos/03b/787727453bd857cff70be6560bfb603b.png'
    },
    menu_type:{
        type: String,
        required: true,
        enum: ['vegetarian', 'non-vegetarian', 'vegan'],
        default: 'vegetarian'
    },
    menu_price: {
        type: String,
        required: true,
        default: '0'
    },
},{
    timestamps: true,
    versionKey: false
}); 

const RestaurantMenu = mongoose.model('RestaurantMenu', restaurantMenuSchema, "restaurantMenus");
module.exports = RestaurantMenu;