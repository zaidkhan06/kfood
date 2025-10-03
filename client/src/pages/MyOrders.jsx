import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';

const MyOrders = () => {
  const navigate = useNavigate();
  const { userData, myOrders } = useSelector(state => state.user)
  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
      <div className='w-full max-w-[800px] pt-4'>
        <div className='flex items-center gap-[20px] mb-6 relative'>
          <div>
            <IoArrowBack onClick={() => navigate("/")} size={35} className='text-[#ff4d2d]' />
          </div>
          <h1 className='text-2xl font-bold '>Orders</h1>
        </div>

        <div className='space-y-6'>
          {myOrders?.map((order, idx)=> (
            userData.role === "User" ? 
            (
              <UserOrderCard  data={order} key={idx}/>
            ): 
            userData.role === "Owner" ?
            (
              <OwnerOrderCard  data={order} key={idx}/>
            ): null
          ))}

        </div>


      </div>

    </div>
  )
}

export default MyOrders