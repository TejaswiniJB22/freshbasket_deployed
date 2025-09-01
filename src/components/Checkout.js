import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Checkout = ({ setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/cart`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Place order for selected product
  const handlePlaceOrder = async (id) => {
    try {
      // delete only that product from cart
      await axios.delete(`${API_URL}/api/cart/${id}`);

      // update state (remove that product only)
      const updatedCart = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCart);

      // update cart count in header
      const totalItems = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);

      // show popup
      window.alert("🎉 Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      window.alert("Something went wrong!");
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
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 border-b pb-2"
              >
                <div className="flex items-center">
                  <img
                    src={`${API_URL}/Images/${item.image}`}
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
                <button
                  onClick={() => handlePlaceOrder(item._id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Place Order
                </button>
              </div>
            ))}
            <div className="mt-4 text-right font-bold text-xl">
              Total: <span className="text-green-600">₹{totalPrice}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;


 
                
               
               
            
