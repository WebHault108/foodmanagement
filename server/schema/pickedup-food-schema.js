import mongoose from "mongoose";

const pickedupFoodSchema = new mongoose.Schema({
  fname: String,
  fooddesc: String,
  foodpickupdate: Date,
  address: String,
  pin: Number,
  expiredays: Number,
  pname: String,
  pmobile: Number,
  image: String,
});

const PickedUpFood = mongoose.model("PickedUpFood", pickedupFoodSchema);

export default PickedUpFood;
