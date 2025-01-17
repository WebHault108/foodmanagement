import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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

const User = mongoose.model("Inventory", userSchema);

// pickedupFoodSchema.js
export default User;
