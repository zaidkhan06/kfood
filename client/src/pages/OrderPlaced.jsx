import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
    const navigate = useNavigate()
  return (
    <div className=' min-h-screen bg-[#fff9f6]  flex flex-col justify-center items-center px-4 text-center relative overflow-hidden'>
            <FaCircleCheck className='text-green-600 text-6xl mb-4 transition-all transition-discrete'/>
            <h2 className='text-2xl sm:text-3xl font-semibold mb-2'>Order Placed Successfully!</h2>
            <p className='text-gray-600'>Thank you for your order. Your order is prepared. You can track your order status in the "My Orders" section.</p>
            <button onClick={()=> navigate("/my-orders")} className='bg-[#ff4d2d] text-white px-4 py-2 rounded-xl text-lg font-medium mt-6'>Back to my orders</button>
        


    </div>
  )
}

export default OrderPlaced