import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { serverUrl } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../redux/userSlice';
import { useState } from 'react';

const OwnerOrderCard = ({ data }) => {
  const[availableBoys, setAvailableBoys] = useState([])
const dispatch = useDispatch()

  const handleUpdateStatus=async(orderId, shopId, status)=>{
    try {
      const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`, {status}, {withCredentials:true})
      dispatch(updateOrderStatus({orderId, shopId, status}))
     setAvailableBoys(result.data.availableBoys || []);
      console.log(result.data)

    } catch (error) {
      console.log(error)
      
    }

  } 
  return (
    <div className='bg-white rounded-lg p-4 space-y-4'>
      <div>
        <h2 className='text-lg font-semibold text-gray-800'>{data.user.fullName}</h2>
        <p className='text-sm text-gray-500'>{data.user.email}</p>
        <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'><FaPhoneAlt /><span>+91 {data.user.mobile}</span></p>
        {data.paymentMethod=="online"? <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>Payment status: {data.payment? "Paid" : "Failed"}</p>: <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>Payment Method: {data.paymentMethod}</p>}
      </div>

      <div className='flex items-start flex-col gap-2 text-gray-600 text-sm'>
        <p className='text-xs text-gray-500'>{data?.deliveryAddress?.text}</p>
        <p>Lat: {data?.deliveryAddress.latitude}, Lon:{data?.deliveryAddress.longitude}</p>

      </div>

      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {data?.shopOrders?.shopOrderItems?.map((item, index) => (
          <div className='w-40 flex-shrink-0 rounded-lg p-2 bg-white' key={index}>
            <img src={item.item.image} alt={item.name} className='w-full h-24 object-cover rounded' />
            <p className='text-sm font-semibold mt-1'>{item.name}</p>
            <p className='text-xs text-gray-500'>Qty:{item.quantity} | ₹{item.price}</p>

          </div>
        ))}
      </div>


      <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
        <span className='text-sm '>Status: <span className='font-semibold capitalize text-[#ff4d2d]'>{data?.shopOrders?.status}</span></span>
        <select  onChange={(e)=>handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}  className='rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#ff4d2d] '>
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out for Delivery</option>
        </select>
      </div>

      {data.shopOrders.status=="out of delivery" && 
      <div className='mt-3 p-2  rounded-lg text-sm bg-orange-50'>
        {data.shopOrders.assignedDeliveryBoy?<p>Assigned Riders:</p>: <p>Available Riders:</p>}
        {availableBoys.length>0?(
          availableBoys.map((b, index)=>(
            <div className='text-gray-500'>{b.fullName}-{b.mobile}</div>
          ))

        ): 
        data.shopOrders.assignedDeliveryBoy?<div>{ data.shopOrders.assignedDeliveryBoy.fullName}-{data.shopOrders.assignedDeliveryBoy.mobile}</div>:<div>Wait for riders.</div>
        }

      </div>
      }

      <div className='text-right font-bold text-gray-800 text-sm'>
        Total: ₹{data?.shopOrders?.subTotal}
      </div>

    </div>
  )
}

export default OwnerOrderCard