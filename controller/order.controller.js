const Order = require("../models/Order.model");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

const placeOrder = async (req, res) => {
  const data = req.body;
  try {
    const newOrder = new Order(data);
    await newOrder.save();

    // Populate the menuItem field with data from the RestaurantMenu model
    const ordersWithMenu = await Order.aggregate([
      {
        $addFields: {
          menuItemNums: {
            $map: {
              input: "$menuItem",
              as: "item",
              in: { $toInt: "$$item" },
            },
          },
        },
      },
      {
        $lookup: {
          from: "restaurantMenus",
          let: { menuItemNums: "$menuItemNums" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$menu_id", "$$menuItemNums"] },
              },
            },
          ],
          as: "menuItemsData",
        },
      },
      {
        $project: {
          menuItemNums: 0, // hide the helper field
        },
      },
    ]);

    res
      .status(201)
      .json({ message: "Order placed successfully", order: ordersWithMenu });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

module.exports = {
  getOrders,
  placeOrder,
};
