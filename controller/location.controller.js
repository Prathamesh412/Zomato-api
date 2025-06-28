
const Location = require('../models/Location.model');

// Function to get all locations
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
}

module.exports = {
    getAllLocations
};
