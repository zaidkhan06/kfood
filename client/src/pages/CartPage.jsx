import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from 'react-redux';
import CartItemCard from '../components/CartItemCard';

const CartPage = () => {
    const navigate = useNavigate()
    const {cartItems, totalAmount} = useSelector(state=>state.user)  
    return (
        <div className='min-h-screen bg-[#fff9f6] flex justify-center p-6'>
            <div className='w-full max-w-[800px] '>
                <div className='flex items-center gap-[20px] mb-6 relative'>
                    <div>
                        <IoArrowBack onClick={() => navigate("/")} size={35} className='text-[#ff4d2d]' />
                    </div>
                    <h1 className='text-2xl font-bold '>Your Cart</h1>
                </div>
                {cartItems?.length==0? (
                    <p className='text-gray-500 text-lg text-center'>Your cart is empty</p>
                ): (
                    <>
                    <div>
                        {cartItems?.map((item, idx)=> (
                            <CartItemCard data={item} key={idx} />
                        ))}

                    </div>
                    <div className='mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center'>
                        <h1 className='text-lg font-semibold'>Total amount</h1><span className='text-xl font-bold text-[#ff4d2d]'>₹ {totalAmount}</span>

                    </div>
                    <div className='mt-4 flex justify-end'>
                        <button className='bg-[#ff4d2d] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#e64526] transition cursor-pointer'>Place Order</button>
                    </div>
                    </>
                )}

            </div>

        </div>
    )
}

export default CartPage