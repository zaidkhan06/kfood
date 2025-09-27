import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchSharp, IoCartOutline, IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  // Redux state (userData & city from store)
  const { userData, currentCity } = useSelector(state => state.user);
  const { myShopData } = useSelector(state => state.owner);
  const [showInfo, setShowInfo] = useState(false); // profile dropdown toggle
  const [showSearch, setShowSearch] = useState(false); // mobile search toggle
  const dispatch = useDispatch();

  // Handle Logout (API call + clear Redux state)
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">

      {/* Logo */}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Kfood</h1>

      {/* Mobile Search Bar (only for Users) */}
      {showSearch && userData.role == "User" && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%]">
          {/* City Location */}
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          {/* Search Input */}
          <div className="flex w-[80%] items-center gap-[10px]">
            <IoSearchSharp size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      {/* Desktop Search Bar (only for Users) */}
      {userData.role == "User" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] md:flex hidden">
          {/* City Location */}
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          {/* Search Input */}
          <div className="flex w-[80%] items-center gap-[10px]">
            <IoSearchSharp size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      {/* Right-side Icons & Actions */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Icon Toggle (User only) */}
        {userData.role == "User" && (
          showSearch ? (
            <RxCross2
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoSearchSharp
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(true)}
            />
          )
        )}


        {/* OWNER Role Navbar */}
        {userData.role == "Owner" ? (
          <>
            {/* Add Food Items only if shop exists */}
            {myShopData && (
              <>
                {/* Add Food Items Button (Desktop) */}
                <button className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]">
                  <FaPlus size={18} />
                  <span>Add Food Items</span>
                </button>

                {/* Add Food Items Mobile */}
                <button className="md:hidden flex items-center p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]">
                  <FaPlus size={18} />
                </button>
              </>
            )}

            {/* My Orders (Desktop) */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">
              <IoNotifications size={18} />
              <span>My Orders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">0</span>
            </div>

            {/* My Orders (Mobile) */}
            <div className="md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">
              <IoNotifications size={18} />
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">0</span>
            </div>
          </>
        ) : (
          // USER Role Navbar
          <>
            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <span className="absolute right-[-6px] top-[-12px] text-[#ff4d2d]">0</span>
              <IoCartOutline size={25} className="text-[#ff4d2d]" />
            </div>

            {/* My Orders Button (Desktop) */}
            <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
              My Orders
            </button>
          </>
        )}


        {/* Profile Avatar */}
        <div
          onClick={() => setShowInfo(prev => !prev)}
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {/* Profile Dropdown */}
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg-right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            <div className="md:hidden text-[#ff4d2d] font-semibold">My Orders</div>
            <div onClick={handleLogout} className="text-[#ff4d2d] font-semibold cursor-pointer">
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
