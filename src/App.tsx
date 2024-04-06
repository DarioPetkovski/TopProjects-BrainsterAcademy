import "./App.css";
import Favorites from "./components/Favorites/Favorites";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantDetail from "./components/RestaurantDetail/RestaurantDetail";
import CuisineDetail from "./components/CuisineDetail/CuisineDetail";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  return <div className="App container-fluid px-5">
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/restaurantdetails/:id" element={<RestaurantDetail/>}/>
        <Route path="/cuisinedetail/:restaurantType" element={<CuisineDetail/>}/>
        <Route path="*" element = {<div className="text-center"><h2>Error 404</h2><h4>Page not found</h4></div>}/>
      </Routes>
      <Footer/>
    </Router>
  </div>;
};

export default App;
