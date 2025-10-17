import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useParams, useNavigate } from 'react-router-dom' // <-- Import useNavigate
import axios from 'axios'
import FoodCard from '../components/FoodCard'
import Navbar from '../components/Navbar'
import { IoArrowBack } from "react-icons/io5"; // <-- Import an icon

const Shop = () => {
  const { shopId } = useParams();
  const navigate = useNavigate(); // <-- Initialize useNavigate
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleShop = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`, { withCredentials: true });
      setShop(result.data.shop);
      setItems(result.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // This runs on both success and error
    }
  };

  useEffect(() => {
    handleShop();
  }, [shopId]);

  // Skeleton shimmer for loading
  const shimmerClass =
    "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse";

  const FoodSkeleton = () => (
    <div className="flex flex-wrap justify-center gap-6">
      {Array(6)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className={`w-40 sm:w-48 md:w-56 h-48 sm:h-60 md:h-64 rounded-xl ${shimmerClass}`}
          ></div>
        ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fff9f6]">
        <p className="text-xl text-gray-600 animate-pulse">Loading shop details...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fff9f6]">
      <Navbar />

      {/* ---------- Shop Banner Section ---------- */}
      {shop && (
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          {/* --- BACK BUTTON ADDED HERE --- */}
          
          
          <img
            className="w-full h-full object-cover brightness-75"
            src={shop.image}
            alt={shop.name}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide">
              {shop.name}
            </h1>
            <p className="text-gray-200 mt-2 text-sm md:text-base max-w-md">{shop.address}</p>
             <button
            onClick={() => navigate(-1)}
            className=" bg-white/80 backdrop-blur-sm text-gray-800 px-6 py-1 rounded-full shadow-lg hover:bg-white transition-all duration-200"
            aria-label="Go back"
          >
            <IoArrowBack size={24} />
          </button>
          </div>
         
        </div>
      )}

      {/* ---------- Menu Section ---------- */}
      <div className="max-w-9xl p-2 mx-auto w-full flex flex-col items-center sm:px-1 lg:px-8 py-10">
        <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-10 text-center relative">
          Explore Our Delicious Menu
          <span className="block w-20 h-[3px] bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] mx-auto mt-2 rounded-full"></span>
        </h2>

        {items.length > 0 ? (
          <div className="w-full flex flex-wrap justify-center gap-5">
            {items.map((item, index) => (
              <FoodCard key={index} data={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No items available right now 🍔</p>
          </div>
        )}
      </div>

      {/* ---------- Footer ---------- */}
      {shop && (
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-5xl mx-auto text-center space-y-2">
            <h3 className="font-semibold text-lg text-gray-700">{shop.name}</h3>
            <p className="text-gray-500 text-sm">{shop.address}</p>
            <p className="text-gray-400 text-xs">Thank you for visiting!</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Shop;