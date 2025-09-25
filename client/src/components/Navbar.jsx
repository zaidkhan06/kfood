 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-red-500">Kfoods</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex gap-10 mr-6">
            <a href="/" className="text-gray-700 hover:text-red-500">Home</a>
            <a href="/menu" className="text-gray-700 hover:text-red-500">Menu</a>
            <a href="/restaurants" className="text-gray-700 hover:text-red-500">Restaurants</a>
            <a href="/about" className="text-gray-700 hover:text-red-500">About</a>
            <a href="/contact" className="text-gray-700 hover:text-red-500">Contact</a>
            </div>

            <button  onClick={() => navigate("/signin")} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2">
              Sign In
            </button>
            <button  onClick={() => navigate("/signup")} className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-500 focus:outline-none"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-md">
          <a href="/" className="block text-gray-700 px-3 py-2 rounded hover:bg-red-50">Home</a>
          <a href="/menu" className="block text-gray-700 px-3 py-2 rounded hover:bg-red-50">Menu</a>
          <a href="/restaurants" className="block text-gray-700 px-3 py-2 rounded hover:bg-red-50">Restaurants</a>
          <a href="/about" className="block text-gray-700 px-3 py-2 rounded hover:bg-red-50">About</a>
          <a href="/contact" className="block text-gray-700 px-3 py-2 rounded hover:bg-red-50">Contact</a>
          <button onClick={() => navigate("/signin")} className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">Login</button>
          <button onClick={() => navigate("/signin")} className="w-full bg-white border border-red-500 text-red-500 px-3 py-2 rounded hover:bg-red-50">Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
