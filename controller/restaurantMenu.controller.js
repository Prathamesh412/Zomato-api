const restaurantMenu = require('../models/RestaurantMenu.model');

const getAllRestaurantMenus = async (req, res) => {
    try {
        const menus = await restaurantMenu.find();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurant menus', error });
    }
}   

module.exports = {
    getAllRestaurantMenus
};