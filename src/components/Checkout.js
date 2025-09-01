import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Checkout = () => {
  const location = useLocation();
  const { cartItems = [] } = location.state || {};

  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      // Save checkout details
      await axios.post(`${API_URL}/api/checkout`, {
        Name: form.name,
        Address: form.address,
        Phone: form.phone,
      });

      // Remove purchased items from cart in backend
      for (let item of cartItems) {
        await axios.delete(`${API_URL}/api/cart/${item._id}`);
      }

      // Show success message
      setOrderPlaced(true);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  // ✅ If order placed, show green success message instead of form
  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="bg-green-600 text-white p-10 rounded-2xl shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">🎉 Order Placed Successfully!</h1>
          <p className="text-lg">Thanks for shopping with <span className="font-semibold">FreshBasket</span> 🛒</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Order Summary */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <p key={item._id}>
                {item.productName} × {item.quantity} = ₹
                {item.price * item.quantity}
              </p>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="bg-white shadow rounded-lg p-4 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
