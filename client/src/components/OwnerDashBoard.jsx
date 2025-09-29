import React from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { FaUtensils, FaPen } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import OwnerItemCard from './OwnerItemCard';

const OwnerDashBoard = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector(state => state.owner);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col items-center">
      <Navbar />

      {/* No Shop Added Yet */}
      {!myShopData && (
        <div className="flex justify-center items-center p-6 sm:p-8 w-full">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-[#ff9966] to-[#ff4d2d] p-4 rounded-full shadow-lg mb-4">
                <FaUtensils className="text-white w-16 h-16 sm:w-20 sm:h-20" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Add Your Restaurant</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Join our food delivery platform and reach thousands of hungry customers every day.
              </p>
              <button
                onClick={() => navigate("/create-edit-shop")}
                className="bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] text-white px-6 sm:px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shop Exists */}
      {myShopData && (
        <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6 mt-8">
          {/* Shop Header */}
          <h1 className="text-2xl font-semibold sm:text-3xl text-gray-900 flex items-center gap-3 text-center">
            <MdFoodBank className="text-[#ff4d2d] w-14 h-14" />
            Welcome to {myShopData.name}
          </h1>

          {/* Shop Card */}
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-orange-100 hover:shadow-3xl transition-all duration-300 w-full max-w-3xl relative">
            {/* Edit Button */}
            <div
              className="absolute top-4 right-4 bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/create-edit-shop")}
            >
              <FaPen size={20} />
            </div>

            <img
              src={myShopData.image}
              alt={myShopData.name}
              className="w-full h-52 sm:h-64 md:h-72 object-cover object-center rounded-t-3xl "
            />

            <div className="p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{myShopData.name}</h2>
              <p className="text-gray-500">{myShopData.city}, {myShopData.state}</p>
              <p className="text-gray-500 mb-4">{myShopData.address}</p>
            </div>
          </div>

          {/* No Items Added Yet */}
          {myShopData.items.length === 0 && (
            <div className="flex justify-center items-center p-6 w-full">
              <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-[#ff9966] to-[#ff4d2d] p-4 rounded-full shadow-lg mb-4">
                    <FaUtensils className="text-white w-16 h-16 sm:w-20 sm:h-20" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Add Your Food Items</h2>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    Share your delicious creations with customers by adding them to the menu.
                  </p>
                  <button
                    onClick={() => navigate("/add-item")}
                    className="bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] text-white px-6 sm:px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    Add Food
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Items List */}
          {myShopData.items.length > 0 && (
            <div className="flex flex-col items-center gap-4 w-full max-w-3xl mb-8">
              {myShopData.items.map((item, index) => (
                <OwnerItemCard data={item} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDashBoard;
