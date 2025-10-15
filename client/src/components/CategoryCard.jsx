import React from 'react'

const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div onClick={onClick} className="
      relative 
      flex-shrink-0 
      w-[45%] sm:w-[30%] md:w-[22%] lg:w-[180px] 
      aspect-square 
      rounded-2xl 
      overflow-hidden 
      bg-white 
      shadow-md 
      hover:shadow-xl 
      transition-all 
      duration-300 
      transform 
      hover:-translate-y-1 
      hover:scale-105 
      cursor-pointer
      mt-5
    ">
      {/* Image */}
      <img
        src={image}
        alt={`${name} category`}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

      {/* Text */}
      <div className="absolute bottom-0 w-full px-2 py-2 text-center">
        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-md truncate">
          {name}
        </p>
      </div>
    </div>
  )
}

export default CategoryCard
