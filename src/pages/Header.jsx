import React from "react";
import { Link } from "react-router-dom";

const Header = ({ cartCount }) => {
  return (
    <header className="bg-green-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">
        FreshBasket
      </Link>
      <nav className="flex gap-6 items-center">
        <Link to="/" className="text-white">Products</Link>
        <Link to="/cart" className="text-white relative">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
