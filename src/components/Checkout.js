import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Checkout = () => {
  const location = useLocation();
  const { cartItems = [] } = location.state || {};

  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  const handlePlaceOrder = async () => {
    // ✅ Validate form
    if (!form.name || !form.address || !form.phone) {
      setError("⚠️ Please fill all the fields before placing order.");
      return;
    }

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

      // Show success toast
      setShowToast(true);
      setForm({ name: "", address: "", phone: "" });

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error("Error placing order:", err);
      setError("❌ Failed to place order, please try again.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
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
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address *"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* ✅ Toast Popup */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          🎉 Order placed successfully! <br /> Thanks for shopping with <b>FreshBasket</b> 🛒
        </div>
      )}
    </div>
  );
};

export default Checkout;
