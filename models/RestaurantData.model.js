const mongoose = require("mongoose");
const MealType = require("./mealTypes.model");

const restaurantDataSchema = new mongoose.Schema(
  {
    restaurant_name: { type: String, required: true },
    location_id: { type: Number, required: true },
    state_id: { type: Number, required: true },
    address: { type: String, required: true },
    restaurant_thumb: { type: String, required: true },
    average_rating: { type: Number, required: true },
    rating_text: { type: String, required: true },
    cost: { type: Number, required: true },
    contact_number: { type: Number, required: true },
    mealTypes: [
      {
        mealtype_id: { type: Number, required: true },
        mealtype_name: { type: String, required: true },
        // Assuming MealType is a model that you have defined elsewhere
        // mealtype: { type: mongoose.Schema.Types.ObjectId, ref: 'MealType' },
      },
    ],
    cuisines: [
      {
        cuisine_id: { type: Number, required: true },
        cuisine_name: { type: String, required: true },
      },
    ],
    image_gallery: { type: [String], required: true },
  },
  { timestamps: true, versionKey: false }
);

const RestaurantData = mongoose.model("RestaurantData", restaurantDataSchema, "restaurantDatas");
module.exports = RestaurantData;


/*
"restaurant_id": 1,
    "restaurant_name": "Domino's Pizza",
    "location_id": 1,
    "state_id": 1,
    "address": "Ashok Vihar Phase 3, New Delhi",
    "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/chains/3/143/c77dfea619f2d7786a7d054afab5cd88_featured_v2.jpg",
    "average_rating": 4.2,
    "rating_text": "Very Good",
    "cost": 666,
    "contact_number": 9453524651,
    "mealTypes": [
      {
        "mealtype_id": 1,
        "mealtype_name": "Breakfast"
      },
      {
        "mealtype_id": 2,
        "mealtype_name": "Lunch"
      }
    ],
    "cuisines": [
      {
        "cuisine_id": 1,
        "cuisine_name": "North Indian"
      },
      {
        "cuisine_id": 4,
        "cuisine_name": "Fast Food"
      }
    ],
    "image_gallery": [
      "https://b.zmtcdn.com/data/pictures/chains/3/143/fbc2c4c9e55a3f011c493dda79c399f5.jpg",
      "https://b.zmtcdn.com/data/pictures/chains/3/143/1adb116d088669540c89150836d668f9.jpg",
      "https://b.zmtcdn.com/data/pictures/chains/3/143/2781ab2c532b711ecd401571cdd87eb9.jpg",
      "https://b.zmtcdn.com/data/pictures/chains/3/143/c751805b5927046d340926f870a95f5e.jpg"
    ]
  },

  */
