import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Checkout = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);

  // Read items passed from Cart.js
  useEffect(() => {
    if (location.state?.cartItems) {
      // ✅ Use items sent from Cart (either single Buy Now or full cart)
      setCartItems(location.state.cartItems);
    } else {
      // ✅ Fallback: fetch full cart if nothing passed
      const fetchCart = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/cart`);
          setCartItems(res.data);
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      };
      fetchCart();
    }
  }, [location.state]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center mb-4">
            <img
              src={`${API_URL}/Images/${item.image}`}
              alt={item.productName}
              className="h-20 w-20 object-contain rounded mr-4"
            />
            <div>
              <p className="font-medium">{item.productName}</p>
              <p>
                {item.quantity} × ₹{item.price} = ₹
                {item.quantity * item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* You can keep your Shipping Details + Place Order logic here */}
    </div>
  );
};

export default Checkout;
