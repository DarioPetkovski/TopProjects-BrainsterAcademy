import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import ProductListing from "./Components/ProductListing/ProductListing";
import ProductPage from "./Components/ProductPage/ProductPage";
import BestDeals from "./Components/BestDeals/BestDeals";
import CatalogPage from "./Components/CatalogPage/CatalogPage";
import About from "./Components/About/About";
import FaqPage from "./Components/FAQ/FaqPage";
import ChatBot from "./Components/ChatBot/ChatBot";
import { Footer } from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { FavoritesModal } from "./Components/FavoritesModal/FavoritesModal";
import { useGlobalContext } from "./context/GlobalContext";
import { Favorites } from "./Components/Favorites/Favorites";
import { LoginModal } from "./Components/LoginModal/LoginModal";
import React from "react";
import { Profile } from "./Components/ProfilePage/Profile";

function App() {
  const { isFavoritesModalOpen, isLoginModalOpen } = useGlobalContext();
  return (
    <div>
      <Router>
        <Navbar />
        {isFavoritesModalOpen && <FavoritesModal />}
        {isLoginModalOpen && <LoginModal />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                {/* <ChatBot /> */}
              </>
            }
          />
          <Route path="/productlisting" element={<ProductListing />} />
          <Route path="/productpage/:id" element={<ProductPage />} />
          <Route path="/bestdeals" element={<BestDeals />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/FAQ" element={<FaqPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Favorites />
        <div className="container-fluid mt-5">
          <div className="row">
            <Footer />
          </div>
        </div>
        <ChatBot />
      </Router>
    </div>
  );
}

export default App;
