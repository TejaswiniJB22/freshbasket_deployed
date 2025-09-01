import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ✅ Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cart`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  // ✅ Handle Form Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone) newErrors.phone = "Phone is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(`${API_URL}/api/orders`, {
        customer: formData,
        items: cartItems,
      });

      // ✅ Clear cart after order
      await axios.delete(`${API_URL}/api/cart/clear`);

      setOrderPlaced(true); // Show green success screen
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-600 text-white text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">🎉 Order Placed Successfully!</h1>
          <p className="text-lg">Thanks for shopping with FreshBasket 🛒</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

      {/* ✅ Order Summary */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex items-center space-x-3 mb-2">
              <img
                src={item.image}
                alt={item.productName}
                className="w-12 h-12 object-cover rounded"
              />
              <p>
                {item.productName} × {item.quantity} = ₹{item.price * item.quantity}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ✅ Checkout Form */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Name *</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded p-2"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium">Address *</label>
            <input
              type="text"
              name="address"
              className="w-full border rounded p-2"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div>
            <label className="block font-medium">Phone *</label>
            <input
              type="text"
              name="phone"
              className="w-full border rounded p-2"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* ✅ Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
}
