import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../pages/Form";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart");
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Clear the cart after successful checkout
  const clearCart = async () => {
    try {
      // Delete each item in the cart
      await Promise.all(cartItems.map(item => axios.delete(`http://localhost:5000/api/cart/${item._id}`)));
      setCartItems([]); // update state to empty
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={`http://localhost:5000/Images/${item.image}`}
                    alt={item.productName}
                    className="h-20 w-20 object-contain rounded mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{item.productName}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 text-right font-bold text-xl">
              Total: <span className="text-green-600">₹{totalPrice}</span>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
            <Form
              onSubmitSuccess={() => {
                alert("Order placed successfully!");
                clearCart();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
