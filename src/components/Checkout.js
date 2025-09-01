import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ✅ Load items from Cart.js or fallback to full cart
  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    } else {
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

  // ✅ Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Place order
  const handlePlaceOrder = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    // Remove ordered items only from frontend cart
    if (location.state?.cartItems) {
      // If Buy Now → remove only that product
      setCartItems([]);
    } else {
      // If Checkout All → clear whole cart
      setCartItems([]);
    }

    setOrderPlaced(true);

    // ✅ After showing success screen, navigate back to cart after 2s
    setTimeout(() => {
      navigate("/cart", { state: { updatedCart: cartItems } });
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-700">Thank you for shopping with FreshBasket.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      {/* ✅ Order Summary */}
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

      {/* ✅ Shipping Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
