const RestaurantData = require("../models/RestaurantData.model");

const getRestaurantData = async (req, res) => {
  try {
    let filter = {};
    console.log(req.query);
    if (req.query.locationId) {
      const locationId = parseInt(req.query.locationId);
      if (!isNaN(locationId)) filter.location_id = locationId;
    }
    if (req.query.stateId) {
      const stateId = parseInt(req.query.stateId);
      if (!isNaN(stateId)) filter.state_id = stateId;
    }

    // if(req.query.cuisine){
    //     const cuisine = { $regex: req.query.cuisine, $options: "i" };
    //     filter["cuisines.cuisine_name"] = cuisine
    // }

    if (req.query.cuisine) {
      // Split by comma and trim spaces, then map to case-insensitive regex
      const cuisines = req.query.cuisine
        .split(",")
        .map((c) => new RegExp(`^${c.trim()}$`, "i"));
      // Use $in to match any of the cuisines
      filter["cuisines.cuisine_name"] = { $in: cuisines };

      // If you want to match all cuisines, use $all instead
      //filter["cuisines.cuisine_name"] = { $all: cuisines };
    }

    if (req.query.meal) {
      const meal = { $regex: req.query.meal, $options: "i" };
      filter["mealTypes.mealtype_name"] = meal;
    }

    const restaurantData = await RestaurantData.find(filter);
    res.status(200).json(restaurantData);
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const filterMeal = async(req,res)=>{
    try {
        const meal = req.params.meal
        const cuisine = req.query.cuisine;

        const lowerPrice = req.query.lowerPrice ? parseInt(req.query.lowerPrice) : 1;
        const upperPrice = req.query.upperPrice ? parseInt(req.query.upperPrice) : Infinity

        const sort = req.query.sort ? req.query.sort : "asc";

        if (!meal) {
            return res.status(400).json({ message: "Meal type is required" });
        }
        if(cuisine){
            const restaurantData = await RestaurantData.find({
            "cuisines.cuisine_name": { $regex: cuisine, $options: "i" },
            "mealTypes.mealtype_name": { $regex: meal, $options: "i" }
        });
        return res.status(200).json(restaurantData);
        }

        if(lowerPrice && upperPrice && sort == "asc"){
            
            const restaurantData = await RestaurantData.find({
                "mealTypes.mealtype_name": { $regex: meal, $options: "i" },
                cost: { $gte: lowerPrice, $lte: upperPrice }
            }).sort({ cost: 1 });
            return res.status(200).json(restaurantData);
        }

        if(lowerPrice && upperPrice && sort == "desc"){
            console.log("there")
            const restaurantData = await RestaurantData.find({
                "mealTypes.mealtype_name": { $regex: meal, $options: "i" },
                cost: { $gte: lowerPrice, $lte: upperPrice }
            }).sort({ cost: -1 });
            return res.status(200).json(restaurantData);
        }
       
        
    }
catch (error) {
        console.error("Error fetching restaurant data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}; 

module.exports = {
  getRestaurantData,
  filterMeal
};
