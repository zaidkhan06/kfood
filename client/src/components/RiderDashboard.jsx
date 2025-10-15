import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { useState } from 'react'
import DeileveryBoyTracking from './DeileveryBoyTracking'

const RiderDashboard = () => {
  const { userData } = useSelector(state => state.user)
  const [availableAssignments, setAvailableAssignments] = useState(0);
  const [currentOrder, setCurrentOrder] = useState("")
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [otp, setOtp] = useState("")
  const getAssignment = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true })
      setAvailableAssignments(result.data)
    } catch (error) {
      console.log(error);

    }

  }

  const getCurrentOrder = async (params) => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`, { withCredentials: true })
      setCurrentOrder(result.data)
      console.log(result.data)

    } catch (error) {
      console.log(error)
    }

  }



  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true })
      console.log(result.data)
      getCurrentOrder()
    } catch (error) {
      console.log(error)
    }

  }


  
  const sendOtp = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/send-delivery-otp`, {
        orderId:currentOrder._id, shopOrderId:currentOrder.shopOrder._id

      },{ withCredentials: true })
      setShowOtpBox(true)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }

  }
  const verifyOtp = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, {
        orderId:currentOrder._id, shopOrderId:currentOrder.shopOrder._id, otp

      },{ withCredentials: true })
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }

  }


 

  useEffect(() => {
    getAssignment();
    getCurrentOrder();

  }, [userData])







  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Navbar />
      <div className='w-full max-w-[900px] flex flex-col gap-5 items-center'>
        <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] text-center gap-3'>
          <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome, {userData.fullName}</h1>
          <p className='text-[#ff4d2d] '><span className='font-semibold'>Latitude: </span>{userData?.location?.coordinates[1]}, <span className='font-semibold'>Longitude: </span>{userData?.location?.coordinates[0]}</p>

        </div>

        {!currentOrder &&

          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%]'>

            <h1 className='text-lg font-bold mb-4 flex items-center gap-2'>Available Orders</h1>

            <div className='space-y-4'>
              {availableAssignments.length > 0
                ? (
                  availableAssignments.map((a, idx) => (
                    <div className='rounded-lg p-4 flex justify-between items-center' key={idx}>
                      <div>
                        <p className='text-sm font-semibold'>{a?.shopName}</p>
                        <p className='text-sm text-gray-500'><span className='font-semibold'>Delivery Address:</span> {a?.deliveryAddress.text}</p>
                        <p className='text-xs text-gray-400'>{a.items.length} items | {a.subTotal}</p>
                      </div>
                      <button onClick={() => acceptOrder(a.assignmentId)} className='bg-[#ff4d2d] text-white px-4 py-1 rounded-lg text-sm hover:bg-[#fc5437]'>Accept</button>

                    </div>
                  ))
                ) :
                <p className='text-gray-400 text-sm'>No Available Orders</p>
              }

            </div>

          </div>

        }

        {currentOrder &&
          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] '>
            <h2 className='text-lg font-bold mb-3'>Current Order</h2>
            <div className='bg-[#fff9f6] rounded-lg p-4 mb-3'>
              <p className='font-semibold text-sm'>{currentOrder?.shopOrder?.shop.name}</p>
              <p className='text-sm text-gray-800'>{currentOrder?.deliveryAddress.text}</p>
              <p className='text-sm text-gray-800'>{currentOrder?.shopOrder.shopOrderItems.length} | {currentOrder.shopOrder.subTotal}</p>
            </div>
            <DeileveryBoyTracking data={currentOrder} />
            {!showOtpBox
              ?
              <button onClick={sendOtp} className='mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 activate:scale-95 transition-all duration-200'>
                Mark as delivered
              </button>
              :
              <div className='mt-4 p-4 shadow-lg rounded-xl bg-gray-50'>
                <p>Enter Otp send to <span className='text-[#ff4d2d]'>{currentOrder.user.fullName}</span></p>
                <input 
                onChange={(e)=>setOtp(e.target.value)}
                value={otp}
                type="text"
                placeholder='Enter OTP'
                className='w-full border-1 border-gray-300 px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]'                
                />
                <button onClick={verifyOtp} className='w-full bg-[#ff4d2d] text-white py-2 rounded-lg font-semibold '>Submit OTP</button>

              </div>

            }


          </div>
        }



      </div>
    </div>
  )
}

export default RiderDashboard