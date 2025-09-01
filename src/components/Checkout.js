import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send order to backend
      await axios.post(`${API_URL}/api/orders`, {
        customer: formData,
        items: cartItems,
        total: totalPrice,
      });

      // Remove items from cart after placing order
      await Promise.all(
        cartItems.map((item) => axios.delete(`${API_URL}/api/cart/${item._id}`))
      );

      setSuccessMessage("Order placed successfully! 🎉");
      setFormData({ name: "", email: "", phone: "", address: "" });

      // Redirect after delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">No items to checkout.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={`${API_URL}/Images/${item.image}`}
                    alt={item.productName}
                    className="h-16 w-16 object-contain rounded mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{item.productName}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.quantity} × ₹{item.price} = ₹
                      {item.quantity * item.price}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                rows="3"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                Place Order
              </button>
            </form>

            {successMessage && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded text-center font-medium">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
