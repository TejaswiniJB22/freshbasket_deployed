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
    <nav className="bg-black shadow-md px-4 sm:px-10 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/apple.jpeg" alt="Fresh Basket Logo" className="w-8 h-8 object-contain" />
          <span className="text-white font-bold text-2xl">Fresh_Basket</span>
        </div>
        <ul className="hidden md:flex space-x-8 text-white font-medium items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li className="relative">
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>
      {isOpen && (
        <ul className="flex flex-col mt-4 space-y-4 text-white font-medium md:hidden">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link to="/checkout" onClick={() => setIsOpen(false)}>Checkout</Link></li>
          <li className="relative">
            <Link to="/cart" className="flex items-center" onClick={() => setIsOpen(false)}>
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
