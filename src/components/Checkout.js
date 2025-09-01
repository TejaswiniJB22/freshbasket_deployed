import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (cartItems.length === 0) {
      // fallback if no cart passed via navigate
      axios.get("http://localhost:5000/api/cart")
        .then(res => setCartItems(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        customer: { name, address, phone },
        items: cartItems,
      });

      setMessage("✅ Order placed successfully!");
      setCartItems([]); // clear UI cart
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to place order.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item._id} className="border-b py-2">
                {item.productName} × {item.quantity} — ₹{item.price}
              </li>
            ))}
          </ul>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full mb-2"
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>

          {message && <p className="mt-3 font-semibold">{message}</p>}
        </div>
      )}
    </div>
  );
}
