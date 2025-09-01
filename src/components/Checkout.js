import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // ✅ show popup
  };

  const closePopup = () => setShowPopup(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">⚠ No items in cart.</p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={`https://freshbasket-backend-upwe.onrender.com/Images/${item.image}`}
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
                required
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                required
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />

              <button
                type="submit"
                className="w-full py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              ✅ Order Placed Successfully!
            </h2>
            <p className="text-gray-700 mb-6">
              Thank you for shopping with FreshBasket.
            </p>
            <button
              onClick={closePopup}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

      
 
                
               
               
            
