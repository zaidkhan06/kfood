import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import ShopCard from "./ShopCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

const UserDashboard = () => {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);
  const [updatedItemsList, setUpdatedItemsList]=useState([]);






  const handleFilterByCategory=(category)=>{
    if(category=="All"){
      setUpdatedItemsList(itemsInMyCity);
    }else{
      const filteredList = itemsInMyCity.filter(i=>i.category===category);
      setUpdatedItemsList(filteredList)
    }

  }
  useEffect(()=>{
    setUpdatedItemsList(itemsInMyCity)

  }, [itemsInMyCity])

  const [loading, setLoading] = useState(true);

  // update scroll buttons
  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };

  useEffect(() => {
    const element = cateScrollRef.current;
    if (!element) return;

    updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
    updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);

    const handleScroll = () => {
      updateButton(
        cateScrollRef,
        setShowLeftCateButton,
        setShowRightCateButton
      );
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  // jab data aa jaye -> loading false
  useEffect(() => {
    if (currentCity && shopInMyCity && itemsInMyCity) {
      setLoading(false);
    }
  }, [currentCity, shopInMyCity, itemsInMyCity]);

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // -------- Skeleton Components with shimmer --------
  const shimmerClass =
    "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse";

  const CategorySkeleton = () => (
    <div className="flex gap-6 overflow-x-auto">
      {Array(6)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className={`min-w-[120px] sm:min-w-[150px] md:min-w-[180px] h-24 rounded-lg ${shimmerClass}`}
          ></div>
        ))}
    </div>
  );

  const ShopSkeleton = () => (
    <div className="flex gap-4 overflow-x-auto">
      {Array(4)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className={`w-64 h-40 rounded-xl ${shimmerClass}`}
          ></div>
        ))}
    </div>
  );

  const FoodSkeleton = () => (
    <div className="flex flex-wrap gap-5 justify-center">
      {Array(6)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className={`w-40 h-48 rounded-xl ${shimmerClass}`}
          ></div>
        ))}
    </div>
  );

  const handleShop = (shop) => {
     navigate(`/shop/${shop._id}`)
  }
  // -------------------------------------------------

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Navbar />
      {searchItems && searchItems.length>0 && (
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-12 sm:mt-4">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2">Search results</h1>
          <div className="w-full h-auto flex flex-wrap gap-6 justify-center">
            {searchItems.map((item)=>(
              <FoodCard data={item} key={item._id} />
            ))}
          </div>

        </div>
      )}

      {/* Categories Section */}
      <div className="w-full max-w-9xl flex flex-col gap-6 items-start px-4 sm:px-6 lg:px-8">
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold relative">
          What’s on Your Mind Today?
          <span className="block w-20 h-[3px] bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] mt-1 rounded-full"></span>
        </h1>

        <div className="w-full relative">
          {showLeftCateButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-[#ff4d2d] p-3 rounded-full shadow-lg hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 z-10"
            >
              <FaCircleChevronLeft size={28} />
            </button>
          )}

          <div ref={cateScrollRef} className="w-full flex overflow-x-auto gap-6 pb-4">
            {loading ? (
              <CategorySkeleton />
            ) : (
              categories?.map((cate, index) => (
                <CategoryCard
                 onClick={()=>handleFilterByCategory(cate.category)}
                  name={cate.category}
                  image={cate.image}
                  key={index}
                  className="min-w-[120px] sm:min-w-[150px] md:min-w-[180px] flex-shrink-0"
                />
              ))
            )}
          </div>

          {showRightCateButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-[#ff4d2d] p-3 rounded-full shadow-lg hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 z-10"
            >
              <FaCircleChevronRight size={28} />
            </button>
          )}
        </div>
      </div>

      {/* Shops */}
      <div className="w-full max-w-9xl flex flex-col gap-6 items-center p-4 md:p-6">
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-wide">
          Taste the Best of{" "}
          <span className="text-[#ff4d2d]">{loading ? "..." : currentCity}</span>
          <span className="block w-20 h-[3px] bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] mt-1 rounded-full"></span>
        </h1>

        <div className="relative w-full">
          {showLeftShopButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-[#ff4d2d] p-2 rounded-full shadow-lg hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 z-10"
            >
              <FaCircleChevronLeft size={28} />
            </button>
          )}

          <div ref={shopScrollRef} className="w-full flex overflow-x-auto gap-4 pb-4">
            {loading ? (
              <ShopSkeleton />
            ) : (
              shopInMyCity?.map((shop, index) => (
                <ShopCard
                   onClick={() => handleShop(shop)}
                  name={shop.name}
                  image={shop.image}
                  key={index}
                />
              ))
            )}
          </div>

          {showRightShopButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-[#ff4d2d] p-2 rounded-full shadow-lg hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 z-10"
            >
              <FaCircleChevronRight size={28} />
            </button>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="w-full max-w-9xl flex flex-col gap-6 items-center px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold relative">
          You Might Love These Dishes
          <span className="block w-20 h-[3px] bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] mt-1 rounded-full"></span>
        </h1>

        <div className="w-full flex flex-wrap justify-center gap-5">
          {loading ? (
            <FoodSkeleton />
          ) : (
            updatedItemsList?.map((item, index) => (
              <FoodCard key={index} data={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
