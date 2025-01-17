import express from "express";
import Connection from "./database/db.js";
import Routes from "./router/router.js";
import cors from "cors";
import bodyParser from "body-parser";

// for authentication
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";
// import User from "./schema/user-schema.js";

// import PickedUpFood from "./schema/pickedup-food-schema.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); // Updated
app.use(bodyParser.json({ extented: true }));
app.use(bodyParser.urlencoded({ extended: true }));

Connection();

//donor schema design
const donorSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Donor = mongoose.model("donor", donorSchema);

//signup system
app.post("/api/reg", async (req, res) => {
  const { fullname, mobile, email, password } = req.body;

  try {
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    const donor = new Donor({
      fullname,
      mobile,
      email,
      password: hashedPassword,
    });

    await donor.save();
    return res.status(201).json({ message: "Donor registered successfully" });
  } catch (error) {
    console.error("Error during registration: ", error);
    return res.status(400).json({ error: "Registration failed" });
  }
});

//login system
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const donor = await Donor.findOne({ email });
  if (!donor) return res.status(404).json({ error: "Email Not found!" });

  const isMatch = await bcrypt.compare(password, donor.password);

  if (!isMatch) return res.status(400).json({ error: "Invalid Password" });

  const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ message: "Login Successful", token });
});

// get the login user data
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

app.get("/api/user", authenticate, async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.id).select("-password");

    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find().select("-password"); // Fetch all donors, exclude passwords
    res.status(200).json(donors);
  } catch (error) {
    console.error("Error fetching donors: ", error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/api/donors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDonor = await Donor.findByIdAndDelete(id);

    if (!deletedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor: ", error);
    res.status(500).json({ error: "Server Error" });
  }
});

//admin reg and login
// schema design
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("admin", adminSchema);

// app.post("/api/adminreg", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const admin = new Admin({ email, password: hashedPassword });
//     await admin.save();
//     return res.status(201).json({ message: "Admin registered successfully" });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     return res.status(400).json({ error: "Admin Registration failed" });
//   }
// });

// login system
app.post("/api/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin)
    return res
      .status(404)
      .json({ error: "Invalid Username and Password for admin" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch)
    return res.status(400).json({ error: "Invalid Password for admin" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ message: "Admin Login successful", token });
});

// Define Mongoose Schema for NGOData
const ngoSchema = new mongoose.Schema({
  data: [Number],
  legends: [
    {
      id: Number,
      value: Number,
      name: String,
      color: String,
    },
  ],
});

const NgoData = mongoose.model("NgoData", ngoSchema);

// Initialize default data (only run once to seed database)
// app.get("/initialize", async (req, res) => {
//   const defaultData = new NgoData({
//     data: [40, 35, 10, 10, 5],
//     legends: [
//       { id: 1, value: 40, name: "Feeding the poor", color: "#91db94" },
//       { id: 2, value: 35, name: "Education", color: "#736498" },
//       { id: 3, value: 10, name: "Planting Trees", color: "#ffefcb" },
//       { id: 4, value: 10, name: "Cleaning Program", color: "#f9ce65" },
//       { id: 5, value: 5, name: "Animal Safety", color: "#f28fbe" },
//     ],
//   });
//   await defaultData.save();
//   res.send("Database initialized with default data.");
// });

// Route to fetch data
app.get("/api/data", async (req, res) => {
  const ngoData = await NgoData.findOne();
  if (!ngoData) {
    return res.status(404).json({ error: "No data found in the database" });
  }
  res.json(ngoData);
});

// Route to update data
app.post("/api/data", async (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  const ngoData = await NgoData.findOne();
  if (ngoData) {
    ngoData.data = data;
    ngoData.legends.forEach((legend, index) => {
      legend.value = data[index] || 0; // Update value or set to 0 if missing
    });
    await ngoData.save();
    res.json({ message: "Data updated successfully", ngoData });
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

app.use("/", Routes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => console.log("server listening to PORT ", PORT));
