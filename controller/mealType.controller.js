const MealType = require('../models/mealTypes.model');

// Function to get all meal types
const getAllMealTypes = async (req, res) => {
    try {
        const mealTypes = await MealType.find();
        res.status(200).json(mealTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching meal types', error });
    }
}

module.exports = {
    getAllMealTypes
};