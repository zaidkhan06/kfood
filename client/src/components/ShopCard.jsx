import React from "react";

const ShopCard = ({ name, image, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center w-[140px] md:w-[180px] shrink-0 cursor-pointer">
      {/* Image wrapper */}
      <div className="relative w-[120px] h-[120px] md:w-[170px] md:h-[170px] rounded-full overflow-hidden shadow-lg border-4 border-white bg-gradient-to-br from-orange-100 to-orange-50 hover:scale-105 transition-transform duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-center rounded-full"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors"></div>
      </div>

      {/* Shop Info */}
      <div className="mt-3 text-center">
        <h2 className="text-sm md:text-base font-semibold text-gray-800  max-w-[120px]">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default ShopCard;
