// import axios from "axios";

// const URL = "http://localhost:8000";

// // Add Food Information API
// export const addFoodInfo = async (data) => {
//   try {
//     return await axios.post(`${URL}/add`, data);
//   } catch (error) {
//     console.log("Error while calling API", error);
//   }
// };

// export const getUsers = async () => {
//   try {
//     return await axios.get(`${URL}/all`);
//   } catch (error) {
//     console.log("Error while Fetching data", error);
//   }
// };

import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

// API to add food information
export const addFoodInfo = async (data) => {
  try {
    return await axios.post(`${URL}/add`, data);
  } catch (error) {
    console.error("Error while adding food info:", error);
  }
};

// API to fetch all users
export const getUsers = async () => {
  try {
    return await axios.get(`${URL}/all`);
  } catch (error) {
    console.error("Error while fetching users:", error);
  }
};

// API to fetch users by mobile number
export const getUsersByMobile = async (mobile) => {
  try {
    return await axios.get(`${URL}/usersByMobile`, {
      params: { mobile }, // Pass mobile as a query parameter
    });
  } catch (error) {
    console.error("Error while fetching users by mobile:", error);
  }
};

// API to fetch picked-up food by mobile number
export const getPickedupFoodByMobile = async (mobile) => {
  try {
    return await axios.get(`${URL}/pickedupByMobile`, {
      params: { mobile }, // Pass mobile as a query parameter
    });
  } catch (error) {
    console.error("Error while fetching picked-up food by mobile:", error);
  }
};

// API to delete users
export const deleteUsers = async (data) => {
  try {
    return await axios.delete(`${URL}/deleteUser`, { data });
  } catch (error) {
    console.error("Error while deleting user:", error);
  }
};

// New function to move food to the "pickedup_food_list" collection
export const deletePickedUpFood = async (data) => {
  try {
    return await axios.post(`${URL}/moveToPickedUp`, data); // Post request to move food to picked-up list
  } catch (error) {
    console.error("Error while calling moveToPickedUp API", error);
  }
};

export const getPickedFoods = async () => {
  try {
    return await axios.get(`${URL}/allpickedfood`);
  } catch (error) {
    console.error("Error while fetching users:", error);
  }
};

export const deletePickedFoodById = async (id) => {
  try {
    return await axios.delete(`${URL}/deletePickedFood/${id}`);
  } catch (error) {
    console.error("Error deleting picked food:", error);
  }
};
export const deletePendingFoodById = async (id) => {
  try {
    return await axios.delete(`${URL}/deletePendingFood/${id}`);
  } catch (error) {
    console.error("Error deleting picked food:", error);
  }
};
