import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { IoArrowBack } from 'react-icons/io5'
import DeileveryBoyTracking from '../components/DeileveryBoyTracking'

const TrackOrderPage = () => {
    const {orderId} = useParams()
    const navigate = useNavigate()
    const [currentOrder, setCurrentOrder] = useState("")
    const handleGetOrder = async () =>{
        try {
            const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, {withCredentials: true})
            setCurrentOrder(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
            
        }

    }
    useEffect(()=> {
        handleGetOrder()
    }, [orderId])
  return (
    <div className='max-w-4xl mx-auto p-4 flex flex-col gap-6 '>
        <div className='asolute flex items-center gap-4 top-[20px] left-[20px] z-[10] mb-[10px]'>
             <IoArrowBack onClick={() => navigate("/my-orders")} size={35} className="text-[#ff4d2d] cursor-pointer " />
                <h1 className='text-2xl font-bold md:text-center'>Track orders</h1>
        </div>

        {currentOrder.shopOrders?.map((shopOrder, index)=>(
            <div key={index} className='bg-white p-4 rounded-2xl shadow-md space-y-4'>
                <div>
                    <p className='text-lg font-bold mb-2 text-[#ff4d2d]'>{shopOrder.shop.name}</p>
                    <p className='font-semibold'><span>Items: </span>{shopOrder.shopOrderItems.map(i=>i.name).join(", ")}</p>
                    <p><span className='font-semibold'>Subtotal: </span>{shopOrder?.subTotal}</p>
                    <p className='mt-6'><span className='font-semibold'>Delivery Address: </span>{currentOrder?.deliveryAddress?.text}</p>
                </div>
                {shopOrder.status != "delivered" ?<>

               
                {shopOrder.assignedDeliveryBoy?
                <div className='text-sm text-gray-700'>
                <p className='font-semibold'><span>Rider Name: </span>{shopOrder.assignedDeliveryBoy.fullName}</p>
                <p className='font-semibold'><span>Rider Contact No: </span>{shopOrder.assignedDeliveryBoy.mobile}</p>
                </div>
                :
                <p className='font-semibold'>Rider is not assigned yet.</p>
                
            }


                </>: <p className='text-green-600 font-semibold text-lg'>Delivered</p>}
                {(shopOrder.assignedDeliveryBoy && shopOrder.status !== "delivered") &&
                <div className='h-[400px] w-full rounded-2xl overflow-hidden shadow-md'>
                <DeileveryBoyTracking data={{
                    deliveryBoyLocation:
                    {
                        lat:shopOrder.assignedDeliveryBoy.location.coordinates[1],
                        lon:shopOrder.assignedDeliveryBoy.location.coordinates[0]

                    },
                    customerLocation:{
                        lat:currentOrder.deliveryAddress.latitude,
                        lon:currentOrder.deliveryAddress.longitude
                    }
                }} />
                </div>
                }

            </div>
           
        ))}
        
        

    </div>
  )
}

export default TrackOrderPage