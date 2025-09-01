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
    <nav className="bg-white shadow-md px-4 sm:px-10 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-2">
          <img
            src="/apple.jpeg"
            alt="Fresh Basket Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-green-700 font-bold text-2xl">
            Fresh_Basket
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-green-700 font-medium items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Cont
