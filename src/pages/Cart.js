import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/cart`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4 max-w-5xl mx-auto">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow p-4">
              <img
                src={`${API_URL}/Images/${item.image}`}
                alt={item.productName}
                className="h-28 w-28 object-contain rounded mr-4 mb-2 sm:mb-0"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.productName}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="mt-2 font-bold">
                  ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-2 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow p-4">
            <p className="text-xl font-bold">
              Total ({cartItems.length} items):{" "}
              <span className="text-green-600">₹{totalPrice}</span>
            </p>
            <button
              onClick={() => navigate("/checkout", { state: { cartItems } })}
              className="bg-blue-600 text-white px-6 py-3 rounded mt-4 sm:mt-0 hover:bg-blue-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
