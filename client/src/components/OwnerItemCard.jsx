import React from 'react'
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setmyShopData } from '../redux/ownerSlice';
import axios from 'axios';


const OwnerItemCard = ({data}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

 const handleDeleteItem = async () => {
  try {
    // Use DELETE since your backend route should be router.delete(...)
    const result = await axios.delete(`${serverUrl}/api/item/delete/${data._id}`, {
      withCredentials: true
    });

    // Dispatch to Redux to update state
    dispatch(setmyShopData(result.data));

  } catch (error) {
    console.error("Delete Item Error:", error.response ? error.response.data : error.message);
  }
}



  return (
    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>
        <div className='w-36 h-[full] flex-shrink-0 bg-gray-50'>
            <img src={data.image} alt={data.name} className='w-full h-full object-cover'/>
        </div>
        <div className='flex flex-col justify-between p-3 flex-1'>
            <div>
                <h2 className='text-base font-semibold text-[#ff4d2d] '>{data.name}</h2>
                <p><span  className='font-medium text-gray-70'>Categories: </span> {data.category}</p>
                <p><span  className='font-medium text-gray-70'>Food Type: </span> {data.foodType}</p>

            </div>
            <div className='flex items-center justify-between'>
                <div className='text-[#ff4d2d]'>₹<span>{data.price}</span></div>
                <div className=' flex items-center gap-2'>
                    <div onClick={()=>navigate(`/edit-item/${data._id}`)} className=' cursor-pointer p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d]'>
                         <FaPen size={16}/>

                    </div>
                    <div onClick={handleDeleteItem} className='cursor-pointer p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d]'>
                        <FaTrash size={16}/>

                    </div>

                </div>
                


            </div>

        </div>

    </div>
  )
}

export default OwnerItemCard