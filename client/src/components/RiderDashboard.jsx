import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { useState } from 'react'
import DeileveryBoyTracking from './DeileveryBoyTracking'
import { ClipLoader } from 'react-spinners'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const RiderDashboard = () => {
  const { userData, socket } = useSelector(state => state.user)
  const [availableAssignments, setAvailableAssignments] = useState(0);
  const [currentOrder, setCurrentOrder] = useState("")
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [otp, setOtp] = useState("")
  const [deliveryBoyLocation, setDeliveryBoyLocation]=useState("")
  const [loding, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [todayDeliveries, setTodayDeliveries] = useState([]);



  useEffect(() => {
    if (!socket || userData.role !== "Rider") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setDeliveryBoyLocation({lat:latitude, lon:longitude})

          // Emit to server
          socket.emit("updateLocation", {
            latitude,
            longitude,
            userId: userData._id,
          });

        },
        (error) => {
          console.error("Geolocation Error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );

    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }

  }, [socket, userData])

  
    const ratePeraDelivery = 50
    const totalEarning=todayDeliveries.reduce((sum, d)=>sum + d.count * ratePeraDelivery, 0)
    
  
  





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
      getCurrentOrder()
    } catch (error) {
      console.log(error)
    }

  }



  const sendOtp = async () => {
    try {
      setLoading(true)
      const result = await axios.post(`${serverUrl}/api/order/send-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id

      }, { withCredentials: true })
      setLoading(false)
      setShowOtpBox(true)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }
  const verifyOtp = async () => {
    setMessage("")
    
    try {
      
      const result = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, otp

      }, { withCredentials: true })
      console.log(result.data)
      setMessage(result.data.message)
      location.reload();
      
    } catch (error) {
      console.log(error)
     
    }

  }

  const handleDelivery = async () => {
  try {
    const result = await axios.get(`${serverUrl}/api/order/get-today-deliveries`, {withCredentials: true})
    console.log(result.data)
    setTodayDeliveries(result.data)
  } catch (error) {
    console.log("HandleDelivery Error",error)
    
  }
}

  useEffect(() => {
    socket?.on("newAssignment", (data) => {
      if (data.sendTo == userData._id) {
        setAvailableAssignments(prev => [...prev, data])
      }
    })
    return () => {
      socket?.off("newAssignment")
    }


  }, [socket])





  useEffect(() => {
    getAssignment();
    getCurrentOrder();
    handleDelivery();

  }, [userData])







  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Navbar />
      <div className='w-full max-w-[900px] flex flex-col gap-5 items-center'>
        <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] text-center gap-3'>
          <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome, {userData.fullName}</h1>
          <p className='text-[#ff4d2d] '><span className='font-semibold'>Latitude: </span>{deliveryBoyLocation.lat}, <span className='font-semibold'>Longitude: </span>{deliveryBoyLocation.lon}</p>

        </div>


        <div className='bg-white rounded-2xl shadow-md  p-5 w-[90%] mb-6'>
          <h1 className='text-lg font-bold mb-3 text-[#ff4d2d]'>Today Deliveries</h1>
          <ResponsiveContainer width="100%"  height={200}>
            <BarChart data={todayDeliveries}>
              <CartesianGrid  strokeDasharray="3, 3"/>
              <XAxis dataKey="hour" tickFormatter={(h)=>`${h}:00`}/>
                <YAxis allowDecimals={false}/>
                <Tooltip formatter={(value)=>{value, "orders"}} labelFormatter={(label)=>`${label}:00`}/>
                  <Bar dataKey="count" fill='#ff4d2d'/>

            </BarChart>
          </ResponsiveContainer>
          <div className='max-w-sm mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg text-center'>
            <h1 className='text-xl font-semibold text-gray-800 mb-2'>Today's Earning</h1>
            <span className='text-3xl font-bold text-green-600'>₹{totalEarning}</span>
          </div>
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
            <DeileveryBoyTracking data={
              {
                deliveryBoyLocation:deliveryBoyLocation ||
                {

                    lat: userData.location.coordinates[1],
                    lon: userData.location.coordinates[0]

                  },
                customerLocation: {
                  lat: currentOrder.deliveryAddress.latitude,
                  lon: currentOrder.deliveryAddress.longitude
                }
              }} />
            {!showOtpBox
              ?
              <button disabled={loding} onClick={sendOtp} className='mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 activate:scale-95 transition-all duration-200'>
                {loding?<ClipLoader size={18} color='#ffff' />:"Mark as delivered"}
              </button>
              :
              <div className='mt-4 p-4 shadow-lg rounded-xl bg-gray-50'>
                <p>Enter Otp send to <span className='text-[#ff4d2d]'>{currentOrder.user.fullName}</span></p>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  type="text"
                  placeholder='Enter OTP'
                  className='w-full border-1 border-gray-300 px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]'
                />
                {message && 
                <p className='text-center text-green-400'>{message}</p>
                }
                
                <button onClick={verifyOtp} className='w-full bg-[#ff4d2d] text-white py-2 rounded-lg font-semibold '> {loding?<ClipLoader size={18} color='#ffff' />:"Submit OTP"}</button>

              </div>

            }


          </div>
        }



      </div>
    </div>
  )
}

export default RiderDashboard