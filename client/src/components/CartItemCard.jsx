import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { removeCartItem, updateQuantity } from '../redux/userSlice'

const CartItemCard = ({data}) => {
    const dispatch = useDispatch()
    const handleIncrease = (id, currentQty) => {
       
         dispatch(updateQuantity({id, quantity: currentQty + 1}))
       

        
    }
    const handleDecrease = (id, currentQty) => {
        if(currentQty>1){
          dispatch(updateQuantity({id, quantity: currentQty - 1}))
        } else {
            dispatch(removeCartItem(id));
        }

    }
  return (
    <div className='flex items-center justify-between bg-white  rounded-2xl p-4 shadow-lg mb-2'>
        <div className='flex items-center gap-4'>
            <img src={data?.image} alt="" className='w-20 h-20 object-cover rounded-lg '/>
            <div>
                <h1 className='font-medium text-gray-800'>{data.name}</h1>
                <p className='text-sm text-gray-500'>₹{data.price} | Qty:{data.quantity}</p>
                <p className='font-semibold text-gray-900'>Total Price: ₹{data.price*data.quantity}</p>
            </div>


        </div>

        <div className='flex items-center gap-3'>
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-sm">
                      <button onClick={() => handleDecrease(data.id, data.quantity)} className="px-1 sm:px-3 py-1 hover:bg-gray-200 transition-all duration-200">
                        <FaMinus size={12} className='cursor-pointer'/>
                      </button>
                      <div className="px-1 w-full sm:px-4 text-gray-800 font-medium text-sm sm:text-base">
                       {data.quantity}
                      </div>
                      <button
                        onClick={()=>handleIncrease(data.id, data.quantity)}
                        className="px-1 sm:px-3 py-1 hover:bg-gray-200 transition-all duration-200"
                      >
                        <FaPlus size={12} className='cursor-pointer'/>
                      </button>
                    </div>
        </div>

    </div>
  )
}

export default CartItemCard