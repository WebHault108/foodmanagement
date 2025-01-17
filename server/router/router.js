// import express, { Router } from "express";
// import User from "../schema/user-schema.js";
// import multer from "multer";
// import { getUsers } from "../controller/user-controller.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },

//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/add", upload.single("image"), async (req, res) => {
//   const user = new User();
//   user.fname = req.body.fname;
//   user.fooddesc = req.body.fooddesc;
//   user.foodpickupdate = req.body.foodpickupdate;
//   user.address = req.body.address;
//   user.pin = req.body.pin;
//   user.pname = req.body.pname;
//   user.pmobile = req.body.pmobile;
//   user.image = req.file.originalname; // Updated file path

//   user.save();
//   res.status(201).json("success");
// });

// router.get("/all", getUsers);
// export default router;

//new updated.  [from chatGPT]

import express from "express";
import multer from "multer";

//step 7: just import the method
import {
  getUsers,
  moveToPickedUp,
  getUserByMobile,
  getpickedupFood,
  getPickedupFoodByMobile,
  deletePickedFood,
  deletePendingFood,
} from "../controller/user-controller.js";
import User from "../schema/user-schema.js";
import PickedUpFood from "../schema/pickedup-food-schema.js";

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// POST route to add a new user/food item
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const user = new User({
      fname: req.body.fname,
      fooddesc: req.body.fooddesc,
      foodpickupdate: req.body.foodpickupdate,
      address: req.body.address,
      pin: req.body.pin,
      expiredays: req.body.expiredays,
      pname: req.body.pname,
      pmobile: req.body.pmobile,
      image: req.file ? req.file.originalname : null,
    });

    await user.save(); // Save to MongoDB
    res.status(201).json("Food item added successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding food item", error: error.message });
  }
});

// GET route to fetch all users
router.get("/all", getUsers);

// Existing routes...

// New route to fetch users by mobile number
router.get("/usersByMobile", getUserByMobile);
// New route to fetch picked-up food by mobile number
router.get("/pickedupByMobile", getPickedupFoodByMobile);

//step 8: now put the remembered end point here and declare the function here dont call
// router.post("/deleteUser", deleteUser);
// router.delete("/deleteUser", deleteUser);
// New route for moving food to picked-up list
router.post("/moveToPickedUp", moveToPickedUp);
router.get("/allpickedfood", getpickedupFood);
router.delete("/deletePickedFood/:id", deletePickedFood);
router.delete("/deletePendingFood/:id", deletePendingFood);

export default router;
