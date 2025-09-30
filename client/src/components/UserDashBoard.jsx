import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';
import ShopCard from './ShopCard';

const UserDashBoard = () => {
  const { currentCity, shopInMyCity, itemsInMyCity } = useSelector(state => state.user)
  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if (element) {
      setLeftButton(element.scrollLeft > 0)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
    }
  }

  useEffect(() => {
    const element = cateScrollRef.current
    if (!element) return

    // Initial check
    updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
    updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)

    const handleScroll = () => {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)
    }

    element.addEventListener("scroll", handleScroll)
    return () => element.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto' >
      <Navbar />
      {/* Categories Section */}
      <div className="w-full max-w-9xl flex flex-col gap-6 items-start px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold relative">
          What’s on Your Mind Today?
          <span className="block w-20 h-[3px] bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] mt-1 rounded-full"></span>
        </h1>

        {/* Scrollable Categories */}
        <div className="w-full relative">
          {/* Left Button */}
          {showLeftCateButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-[#ff4d2d] p-3 rounded-full shadow-lg hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 z-10"
            >
              <FaCircleChevronLeft size={28} />
            </button>
          )}

          {/* Categories */}
          <div
            ref={cateScrollRef}
            className="w-full flex overflow-x-auto gap-6 pb-4"
          >
            {categories.map((cate, index) => (
              <CategoryCard
                name={cate.category}
                image={cate.image}
                key={index}
                className="min-w-[120px] sm:min-w-[150px] md:min-w-[180px] flex-shrink-0"
              />
            ))}
          </div>

          {/* Right Button */}
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
        {/* Heading */}
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-wide">
        Taste the Best of <span className="text-[#ff4d2d]">{currentCity}</span>
          <span className="block w-20 h-[3px] bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] mt-1 rounded-full"></span>
        </h1>

        {/* Shops scroll container */}
        <div className="relative w-full">
          {/* Left Button */}
          {showLeftShopButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-[#ff4d2d] p-2 rounded-full shadow-lg hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 z-10"
            >
              <FaCircleChevronLeft size={28} />
            </button>
          )}

          {/* Scrollable Shops */}
          <div
            ref={shopScrollRef}
            className="w-full flex overflow-x-auto gap-4 pb-4 "
          >
            {shopInMyCity?.map((shop, index) => (
              <ShopCard
                name={shop.name}
                image={shop.image}
                location={shop.city}
                key={index}
              />
            ))}
          </div>

          {/* Right Button */}
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


      {/* Product */}
      <div className="w-full max-w-9xl flex flex-col gap-6 items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Section Heading */}
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold relative">
          You Might Love These Dishes
          <span className="block w-20 h-[3px] bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] mt-1 rounded-full"></span>
        </h1>

        {/* Food Cards Grid */}
        <div className="w-full flex flex-wrap justify-center gap-5">
          {itemsInMyCity?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>


    </div>
  )
}

export default UserDashBoard
