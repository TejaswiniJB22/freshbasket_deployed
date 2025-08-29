import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/orders", {
        ...formData,
        cartItems,
      });
      setSuccess(true);
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  if (success) {
    return <h2 className="text-center text-green-600">🎉 Order Placed Successfully!</h2>;
  }

  if (cartItems.length === 0) {
    return <h2 className="text-center text-red-600">⚠ No cart data received in Checkout</h2>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-md mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
