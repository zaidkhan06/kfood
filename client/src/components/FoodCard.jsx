import React, { useState } from 'react'
import { FaLeaf, FaDrumstickBite, FaMinus, FaPlus, FaCartArrowDown } from 'react-icons/fa'
import { IoMdStar, IoMdStarOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/userSlice'

const FoodCard = ({ data }) => {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.user)

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <IoMdStar key={i} className="text-yellow-500 text-[12px] sm:text-sm" />
        ) : (
          <IoMdStarOutline key={i} className="text-yellow-500 text-[12px] sm:text-sm" />
        )
      )
    }
    return stars
  }

  const handleIncrease = () => setQuantity(quantity + 1)
  const handleDecrease = () => quantity > 0 && setQuantity(quantity - 1)

  return (
    <div className="w-[47%] sm:w-[40%] md:w-[30%] lg:w-[260px] bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer ">

      {/* Image Section */}
      <div className="relative w-full h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden rounded-t-3xl">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          {data.foodType === 'Veg' ? (
            <FaLeaf className="text-green-600 text-sm sm:text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-sm sm:text-lg" />
          )}
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Food Info */}
      <div className="flex-1 flex flex-col p-3 sm:p-4 gap-1">
        <h2 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg truncate">
          {data.name}
        </h2>
        <div className="flex items-center gap-1 mt-1">
          {renderStars(data.rating?.average || 0)}
          <span className="text-[10px] sm:text-xs text-gray-500">({data.rating?.count || 0})</span>
        </div>
        <span className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">₹{data.price}</span>
      </div>

      {/* Quantity + Cart */}
      <div className="flex items-center justify-between p-2 sm:p-3 gap-2">
        {/* Quantity Selector */}
        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-sm">
          <button
            onClick={handleDecrease}
            className="px-1 sm:px-3 py-1 hover:bg-gray-200 transition-all duration-200"
          >
            <FaMinus size={12} />
          </button>
          <div className="px-1 w-full sm:px-4 text-gray-800 font-medium text-sm sm:text-base">
            {quantity}
          </div>
          <button
            onClick={handleIncrease}
            className="px-1 sm:px-3 py-1 hover:bg-gray-200 transition-all duration-200"
          >
            <FaPlus size={12} />
          </button>
        </div>

        {/* Add to Cart */}
        <button onClick={() => {
          quantity > 0 ? dispatch(addToCart({
            id: data._id,   
            name: data.name,
            price: data.price,
            image: data.image,
            shop: data.shop,
            quantity,
            foodType: data.foodType
          })) : null
        }} className={`${cartItems.some(i => i.id == data._id) ? "bg-gray-800" : "bg-gradient-to-r from-[#ff4d2d] to-[#ff9966]"} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm`}>
          <FaCartArrowDown /> <span>Add</span>
        </button>
      </div>
    </div>
  )
}

export default FoodCard
