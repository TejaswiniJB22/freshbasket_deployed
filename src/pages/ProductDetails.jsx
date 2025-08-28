import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post(`${API_URL}/api/cart`, {
        productId: product._id,
        productName: product.name,
        image: product.image,
        price: product.price,
        quantity: Number(quantity),
      });
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  if (!product) return <p className="p-8 text-center text-xl">Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden h-96">
          <img
            src={`${API_URL}/Images/${product.image}`}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-6">₹{product.price}</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
              className="w-24 border rounded p-2 text-center"
            />
            <button
              onClick={addToCart}
              className="bg-green-500 text-white py-2 px-6 rounded font-medium hover:bg-blue-600 hover:scale-105 transition"
            >
              Add to Cart
            </button>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-500 text-white py-2 px-2 rounded hover:bg-blue-600 transition"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
