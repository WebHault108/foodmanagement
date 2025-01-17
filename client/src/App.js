import { AddFood } from "./components/DonorDashboard/Pages/AddFood";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import JoinUs from "./components/JoinUs/JoinUs";
import { HomeNav } from "./components/HomeNav/HomeNav";
import { ViewFoodList } from "./components/DonorDashboard/Pages/ViewFoodList";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Services from "./components/Service/Service";
import FoodList from "./components/FoodList/FoodList";
import Login from "./components/Login/AdminLogin";
import Signup from "./components/Login/AdminSignup";
import { Admin } from "./components/Admin/Admin";
import AllDonors from "./components/Admin/AllDonors";
import DonorDashboard from "./components/DonorDashboard/DonorDashboard";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import AdminCharts from "./components/Admin/AdminCharts";
import AdminDonatedFood from "./components/Admin/AdminDonatedFood";
import AdminPendingFood from "./components/Admin/AdminPendingFood";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <HomeNav /> <Home />
                <Footer />
              </div>
            }
          ></Route>
          <Route
            exact
            path="/About"
            element={
              <div>
                <HomeNav /> <About />
                <Footer />
              </div>
            }
          ></Route>
          <Route
            exact
            path="/Services"
            element={
              <div>
                <HomeNav /> <Services />
                <Footer />
              </div>
            }
          ></Route>
          <Route
            exact
            path="/FoodList"
            element={
              <div>
                <HomeNav /> <FoodList />
                <Footer />
              </div>
            }
          ></Route>
          <Route exact path="/viewfood" element={<ViewFoodList />}></Route>
          <Route exact path="/main" element={<DonorDashboard />}></Route>
          <Route
            exact
            path="/Pages/AddFood/AddFood"
            element={<AddFood />}
          ></Route>
          <Route exact path="/AddFood" element={<AddFood />}></Route>
          <Route exact path="/adminsignup" element={<Signup />}></Route>
          <Route exact path="/AdminCharts" element={<AdminCharts />}></Route>
          <Route exact path="/all-donors" element={<AllDonors />}></Route>
          <Route
            exact
            path="/pendingfood"
            element={<AdminPendingFood />}
          ></Route>
          <Route
            exact
            path="/donatedfood"
            element={<AdminDonatedFood />}
          ></Route>
          <Route exact path="/adminlogin" element={<Login />}></Route>
          <Route
            exact
            path="/joinUs"
            element={
              <div>
                <HomeNav /> <JoinUs />
                <Footer />
              </div>
            }
          ></Route>

          {/* protected route here  */}
          <Route
            exact
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
