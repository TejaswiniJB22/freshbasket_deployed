import React from "react";

const About = () => {
  return (
    <>

      {/* Hero Section */}
      <section className="h-[60vh] flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
        <div className="p-8 rounded-xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4 drop-shadow-lg">
            About Fruit_Basket
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl">
            Freshness and quality delivered straight to your doorstep
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 sm:px-16 max-w-4xl mx-auto text-center bg-white rounded-xl shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-8">
          Our Story
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-6">
          At <span className="font-semibold text-green-700">Fruit_Basket</span>, we provide fresh, organic fruits directly from local farms to your home.  
          Our focus is on <span className="font-semibold">quality, sustainability, and customer happiness</span>.
        </p>
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
          Every fruit is carefully selected to ensure it reaches you fresh, delicious, and nutritious.  
          Experience the taste of nature with every bite!
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-green-50">
        <button
          onClick={() => window.location.href = "/products"}
          className="px-10 py-4 bg-green-500 text-white rounded-3xl font-semibold shadow-lg hover:bg-blue-600 hover:scale-105 transform transition-all duration-300"
        >
          Explore Our Fruits
        </button>
      </section>

    </>
  );
};

export default About;
