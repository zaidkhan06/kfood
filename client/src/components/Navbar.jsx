import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchSharp, IoCartOutline, IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setSearchItems, setUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {

  const { userData, currentCity, cartItems } = useSelector(state => state.user);
  const { myShopData } = useSelector(state => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchPlaceholders = [
    "Search delicious food...",
    "Try spicy pizza...",
    "Fresh burgers near you...",
    "Desserts to delight you...",
  ];

  

  const handleSearchItems = async (query) => {
    try {
      const res = await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`, {withCredentials: true});
      console.log(res.data);
      dispatch(setSearchItems(res.data))
    } catch (error) {
      console.log(error)
      
    }

  }
  useEffect(() => {
    if(query){

      handleSearchItems(query);
    } else {
      dispatch(setSearchItems(null))
    }
  }, [query])
  

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
        setFade(true); // fade in
      }, 500); // same as transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentPlaceholder = searchPlaceholders[placeholderIndex];

  return (
    <nav className="w-full fixed top-0 z-50  backdrop-blur-md  px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between md:justify-center gap-4">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/")}>
        Kfood
      </h1>

      {/* Desktop Search */}
      {userData.role === "User" && (
        <div className="hidden md:flex items-center w-[50%] lg:w-[40%] h-[50px] bg-white rounded-full shadow-md px-4 gap-2">
          <FaLocationDot className="text-[#ff4d2d] text-lg" />
          <span className="truncate text-gray-600">{currentCity}</span>
          <IoSearchSharp className="text-[#ff4d2d] text-lg" />
          <input
          onChange={(e)=>setQuery(e.target.value)}
          value={query}
            type="text"
            placeholder={currentPlaceholder}
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
            className="flex-1 px-2 outline-none text-gray-700 bg-transparent"
          />
        </div>
      )}

      {/* Right Icons */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Mobile Search Toggle */}
        {userData.role === "User" && (
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition" onClick={() => setShowSearch(!showSearch)}>
            {showSearch ? <RxCross2 size={24} className="text-[#ff4d2d]" /> : <IoSearchSharp size={24} className="text-[#ff4d2d]" />}
          </button>
        )}

        {/* Owner Actions */}
        {userData.role === "Owner" && myShopData && (
          <button
            onClick={() => navigate("/add-item")}
            className="hidden md:flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-[#ff4d2d]/80 to-[#ff9966]/80 text-white rounded-full shadow hover:scale-105 transition-transform"
          >
            <FaPlus /> Add Food
          </button>
        )}

        {/* Notifications / Orders */}
        {userData.role === "Owner" ? (
          <>
            <div onClick={() => navigate("/my-orders")} className="relative hidden md:flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">
              <IoNotifications size={20} />
              <span>My Orders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">0</span>
            </div>
            <div className=" relative md:hidden flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium" onClick={() => navigate("/my-orders")}
            >
              <IoNotifications size={20} />
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">0</span>


            </div>
          </>
        ) : (
          <>
            {userData.role == "User" &&
              <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-1 py-[1px]">{cartItems.length}</span>
                <IoCartOutline size={25} className="text-[#ff4d2d]" />
              </div>
            }


            <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium " onClick={() => navigate("/my-orders")}>My Orders</button>
          </>
        )}

        {/* Profile Avatar */}
        <div
          onClick={() => setShowInfo(prev => !prev)}
          className="w-10 h-10 rounded-full bg-[#ff4d2d] flex items-center justify-center text-white font-semibold text-lg shadow-lg cursor-pointer"
        >
          {userData?.fullName?.[0]}
        </div>

        {/* Profile Dropdown */}
        {showInfo && (
          <div
            className={`fixed top-[90px] right-4 lg:right-[10%] ${userData.role === "Rider" ? "lg:right-[30%]" : "md:right-[25%]"
              } w-[200px] bg-white rounded-xl shadow-2xl p-4 flex flex-col gap-2 z-50`}
          >
            <div className="font-semibold text-gray-900">{userData.fullName}</div>

            {userData.role === "User" && (
              <div
                onClick={() => navigate("/my-orders")}
                className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer"
              >
                My Orders
              </div>
            )}

            {userData.role === "Rider" && (
              <div
                onClick={() => navigate("/rider-dashboard")}
                className="text-[#ff4d2d] font-semibold cursor-pointer hover:underline"
              >
                Rider Dashboard
              </div>
            )}

            <div
              onClick={handleLogout}
              className="text-[#ff4d2d] font-semibold cursor-pointer hover:underline"
            >
              Logout
            </div>
          </div>
        )}

      </div>

      {/* Mobile Search Bar */}
      {showSearch && userData.role === "User" && (
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[90%] h-[70px] bg-white shadow-lg rounded-full flex items-center px-4 gap-2 md:hidden">
          <FaLocationDot className="text-[#ff4d2d]" />
          <span className="truncate text-gray-600">{currentCity}</span>
          <IoSearchSharp className="text-[#ff4d2d]" />
          <input type="text"
          onChange={(e)=>setQuery(e.target.value)}
          value={query}
            placeholder={currentPlaceholder}
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
            className="flex-1 outline-none text-gray-700 px-2" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
