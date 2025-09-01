import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Products = ({ setCartCount }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      await axios.post(`${API_URL}/api/cart`, {
        productName: product.productName,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1,
      });

      // ✅ Fetch updated cart and set count
      const updatedCart = await axios.get(`${API_URL}/api/cart`);
      setCartCount(updatedCart.data.length);

      alert(`${product.productName} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={`${API_URL}/Images/${product.image}`}
              alt={product.productName}
              className="h-40 w-40 object-contain mb-4"
            />
            <h2 className="font-semibold text-lg">{product.productName}</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="mt-2 font-bold text-green-600">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
