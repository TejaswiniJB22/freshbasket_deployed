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
        className="h-[85vh] relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('${API_URL}/Images/banner6.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-green-50/30 to-white/10"></div>

        <div className="relative z-10 text-center p-8 sm:p-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-800 mb-4 drop-shadow-md">
            {typedText}
            <span className="blinking-cursor">|</span>
          </h1>

          <p className="text-green-700 text-lg sm:text-xl mb-6">
            Get the best quality fruits delivered to your doorstep
          </p>

          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-green-500 text-white rounded-2xl font-semibold shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
      </section>

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
