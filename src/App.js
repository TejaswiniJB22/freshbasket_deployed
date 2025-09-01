import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

function App() {
  const [cartCount, setCartCount] = useState(0);

  // fetch cart count initially
  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/cart`);
      setCartCount(res.data.length);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <Router>
      {/* Pass cartCount and updater to header */}
      <Header cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Products setCartCount={setCartCount} />} />
        <Route
          path="/cart"
          element={<Cart setCartCount={setCartCount} />}
        />
        <Route path="/checkout" element={<Checkout setCartCount={setCartCount} />} />
      </Routes>
    </Router>
  );
}

export default App;
