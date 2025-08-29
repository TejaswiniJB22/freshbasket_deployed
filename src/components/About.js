import React from "react";

const API_URL = "https://freshbasket-backend-upwe.onrender.com";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section with Banner */}
      <div className="relative h-64 md:h-80 w-full">
        <img
          src={`https://i.postimg.cc/ncFtd3TR/IMG-20250824-WA0071.jpg`}
          alt="About Us Banner"
          className="w-full h-full object-cover rounded-b-2xl brightness-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
            About Us
          </h1>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-4xl px-6 md:px-12 py-12 text-center">
        <p className="text-gray-700 text-lg mb-6">
          Welcome to{" "}
          <span className="font-bold text-green-600">Fruit_Basket</span> – 
          your trusted source for the freshest fruits delivered right to your doorstep.
        </p>

        {/* Mission Section */}
        <div className="text-left mt-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
            🌱 Our Mission
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Deliver fresh, nutritious, and affordable fruits.</li>
            <li>Support local farmers and sustainable practices.</li>
            <li>Promote healthy lifestyles through natural food choices.</li>
          </ul>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-left mt-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
            🍎 Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Handpicked seasonal fruits.</li>
            <li>Fast and eco-friendly delivery.</li>
            <li>Trusted by thousands of happy customers.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
