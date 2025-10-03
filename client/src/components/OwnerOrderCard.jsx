import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";

const OwnerOrderCard = ({ data }) => {
  console.log(data);
  return (
    <div className='bg-white rounded-lg p-4 space-y-4'>
      <div>
        <h2 className='text-lg font-semibold text-gray-800'>{data.user.fullName}</h2>
        <p className='text-sm text-gray-500'>{data.user.email}</p>
        <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'><FaPhoneAlt /><span>+91 {data.user.mobile}</span></p>
      </div>

      <div className='flex items-start flex-col gap-2 text-gray-600 text-sm'>
        <p className='text-xs text-gray-500'>{data?.deliveryAddress?.text}</p>
        <p>Lat: {data?.deliveryAddress.latitude}, Lon:{data?.deliveryAddress.latitude}</p>

      </div>

      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {data?.shopOrders[0]?.shopOrderItems?.map((item, index) => (
          <div className='w-40 flex-shrink-0 rounded-lg p-2 bg-white' key={index}>
            <img src={item.item.image} alt={item.name} className='w-full h-24 object-cover rounded' />
            <p className='text-sm font-semibold mt-1'>{item.name}</p>
            <p className='text-xs text-gray-500'>Qty:{item.quantity} | ₹{item.price}</p>

          </div>
        ))}
      </div>


      <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
        <span className='text-sm '>Status: <span className='font-semibold capitalize text-[#ff4d2d]'>{data.shopOrders[0].status}</span></span>
        <select value={data.shopOrders[0].status} className='rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#ff4d2d] '>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out for Delivery</option>
        </select>

      </div>

    </div>
  )
}

export default OwnerOrderCard