import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; 
import { FaShoppingCart } from "react-icons/fa"; 
import axios from "axios";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/cart`);
      const totalItems = res.data.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md rounded-xl mt-4 relative z-50">
      {/* Left Logo Part (unchanged) */}
      <div className="flex items-center space-x-3">
        <img src="/apple.jpeg" alt="Fresh Basket Logo" className="w-10 h-10 object-contain" />
        <h1 className="text-3xl font-extrabold text-green-600 font-lobster tracking-wide">
          Fresh_Basket
        </h1>
      </div>

      {/* Desktop Menu */}
      <nav className="space-x-8 hidden md:flex items-center font-medium">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/products" className="hover:text-green-600">Products</Link>
        <Link to="/about" className="hover:text-green-600">About</Link>
        <Link to="/contact" className="hover:text-green-600">Contact</Link>
        <Link to="/checkout" className="hover:text-green-600">Checkout</Link>

        {/* Cart with Badge (desktop) */}
        <Link to="/cart" className="relative">
          <button className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-transform transform hover:scale-110">
            <FaShoppingCart className="text-lg" />
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>

      {/* Hamburger Menu (mobile) */}
      <button
        className="md:hidden text-3xl text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 right-6 bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-4 md:hidden w-48 z-50">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/checkout" onClick={() => setIsOpen(false)}>Checkout</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>
            🛒 Cart {cartCount > 0 && <span className="font-bold">({cartCount})</span>}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

  
         
      
     
