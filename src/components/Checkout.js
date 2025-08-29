import React, { useEffect, useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [success, setSuccess] = useState(false);

  // Fetch cart items
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
      await Promise.all(
        cartItems.map((item) =>
          axios.delete(`http://localhost:5000/api/cart/${item._id}`)
        )
      );
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // (Optional) Save order in backend
      await axios.post("http://localhost:5000/api/orders", {
        ...formData,
        cartItems,
      });

      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (success) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-green-600">
            🎉 Order Placed Successfully!
          </h1>
          <p className="mt-2 text-gray-600">Thank you for shopping with us.</p>
        </div>
      </div>
    );
  }

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
              <div
                key={item._id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:5000/Images/${item.image}`}
                    alt={item.productName}
                    className="h-20 w-20 object-contain rounded mr-4"
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
        </div>
      )}
    </div>
  );
};

export default Checkout;

