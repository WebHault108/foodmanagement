import User from "../schema/user-schema.js";
// import PickedUpFood from "../schema/pickedup-food-schema.js";

// import { DonorSchema } from "../index.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users); // Send response with status 200
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const getUserByMobile = async (req, res) => {
  try {
    const { mobile } = req.query; // Get mobile number from query parameter

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    const users = await User.find({ pmobile: mobile }); // Filter users by pmobile
    res.status(200).json(users); // Return the filtered users
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// step 6: here the work is to fetch the id from the frontend by _id params on database
// export const deleteUser = async (req, res) => {
//   try {
//     console.log(req.body);
//     const result = await User.deleteOne({ _id: req.body.id });
//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ message: "User not found or already deleted" });
//     }
//     res.status(201).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting user", error: error.message });
//   }
// };

import PickedUpFood from "../schema/pickedup-food-schema.js"; // Import the new model

// Make sure this is pointing to the correct model file

export const moveToPickedUp = async (req, res) => {
  try {
    const { id } = req.body; // Grab the food item id from the request body

    // Find the food item by its id in the User collection (foodlist)
    const foodItem = await User.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Create a new document in the PickedUpFood collection
    const pickedUpFood = new PickedUpFood({
      fname: foodItem.fname,
      fooddesc: foodItem.fooddesc,
      foodpickupdate: foodItem.foodpickupdate,
      address: foodItem.address,
      pin: foodItem.pin,
      expiredays: foodItem.expiredays,
      pname: foodItem.pname,
      pmobile: foodItem.pmobile,
      image: foodItem.image,
    });

    // Save the food item to the "pickedup_food_list"
    await pickedUpFood.save();

    // Delete the food item from the original "foodlist" collection
    await User.deleteOne({ _id: id });

    res.status(201).json({ message: "Food item moved to picked-up list" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error moving food item", error: error.message });
  }
};

export const getpickedupFood = async (req, res) => {
  try {
    const pickedupFood = await PickedUpFood.find(); // Fetch all picked up food list
    res.status(200).json(pickedupFood); // Send response with status 200
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const getPickedupFoodByMobile = async (req, res) => {
  try {
    const { mobile } = req.query; // Get mobile number from query parameter

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    const pickedupFood = await PickedUpFood.find({ pmobile: mobile }); // Filter by pmobile
    res.status(200).json(pickedupFood); // Return the filtered picked-up food
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching picked-up food", error: error.message });
  }
};

export const deletePickedFood = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PickedUpFood.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting food item", error: error.message });
  }
};
export const deletePendingFood = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting food item", error: error.message });
  }
};
