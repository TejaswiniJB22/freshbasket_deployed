import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const Banner = () => {
  const navigate = useNavigate();
  const fullText = "Fresh & Organic Fruits";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <section
        className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${API_URL}/Images/banner7.jpg')`,
        }}
      >
        {/* Light overlay for brightness */}
        <div className="absolute inset-0 bg-white bg-opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow mb-4">
            <span className="text-green-600">{typedText}</span>
            <span className="blinking-cursor">|</span>
          </h1>

          <p className="text-gray-900 mt-4 text-lg leading-relaxed font-medium">
            Discover the joy of fresh fruits with <span className="text-green-600 font-semibold">Fresh_Basket</span>. 
            From seasonal favorites to exotic varieties, we bring the best of nature 
            directly to your home. Healthy, delicious, and convenient – freshness in every bite.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 px-10 py-4 bg-green-500 text-white text-lg rounded-xl shadow-lg hover:bg-green-600 transform transition-all hover:scale-110"
          >
            Start Shopping
          </button>
        </div>
      </section>

      {/* Blinking cursor style */}
      <style>{`
        .blinking-cursor {
          font-weight: 100;
          font-size: 1em;
          color: green;
          animation: blink 0.7s infinite;
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default Banner;
