import React from "react";
import heroImage from "../assets/foodImage.jpg"; // Put your hero image in src/assets folder

const Hero = () => {
  return (
    <section className="relative bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Delicious Food Delivered To Your Doorstep
          </h1>
          <p className="text-gray-600 mb-6">
            Explore hundreds of restaurants and dishes in your city. Quick delivery, easy ordering!
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600">
              Order Now
            </button>
            <button className="bg-white border border-red-500 text-red-500 px-6 py-3 rounded hover:bg-red-50">
              View Menu
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src={heroImage}
            alt="Delicious food"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
