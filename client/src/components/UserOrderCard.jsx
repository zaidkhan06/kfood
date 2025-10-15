import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserOrderCard = ({ data }) => {
  const navigate = useNavigate()
  console.log(data);

  return (
    <div className='bg-white p-4 space-y-2 '>
      <div className='flex justify-between border-b pb-2'>
        <div>
          <p className='font-semibold'>
            Order #{data._id.slice(-6)}
          </p>
          <p className='text-sm text-gray-500'>
            {new Date(data.createdAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}

          </p>

        </div>
        <div className='text-right'>
          <p className='text-sm text-gray-500'>
            {data.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
          </p>
          <p className='text-sm text-gray-500'>
            {data?.shopOrders?.status}
          </p>
        </div>

      </div>

      {data?.shopOrders?.map((shopOrder, index)=> (
        <div className='rounded-lg p-3  bg-[#fffaf7] space-y-3' key={index}>
          <p>{shopOrder.shop.name}</p>
          <div className='flex space-x-4 overflow-x-auto pb-2'>
            {shopOrder.shopOrderItems.map((item, index)=> (
              <div className='w-40 flex-shrink-0 rounded-lg p-2 bg-white' key={index}> 
              <img src={item.item.image} alt={item.name} className='w-full h-24 object-cover rounded'/>
              <p className='text-sm font-semibold mt-1'>{item.name}</p>
              <p className='text-xs text-gray-500'>Qty:{item.quantity} | ₹{item.price}</p>

              </div> 
            ))}  
          </div>
          <div className='flex justify-between items-center border-t pt-2 '>
              <p className='font-semibold'>Subtotal: {shopOrder.subTotal}</p>
              <span className='text-sm font-medium text-blue-600'>{shopOrder.status}</span>
              
            </div>
        </div>
      ))}
      <div className='flex justify-between items-center border-t pt-2 m-3'>
        <p className='font-semibold'>Total: ₹{data.totalAmount}</p>
        <button onClick={()=>navigate(`/track-order/${data._id}`)} className='bg-[#ff4d2d] text-white px-4 py-2 rounded-lg text-sm'>Track Orders</button>
      </div>

    </div>
  )
}

export default UserOrderCard