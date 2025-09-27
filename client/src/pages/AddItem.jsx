import React, { useRef, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { setmyShopData } from '../redux/ownerSlice';

const AddItem = () => {
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    const [category, setCategory] = useState("")
    const [foodType, setFoodType] = useState("Veg");
    const categories = ["Snacks", "Main Course", "Desserts", "Pizza", "Burgers", "Sandwiches", "South Indian", "North Indian", "Chinese", "Fast Food", "Others"]
    const [name, setName] = useState("");
    const [frontendImage, setFrontendImage] = useState("");
    const [backendImage, setBackendImage] = useState("");
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch()

    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("foodType", foodType);
        formData.append("price", price);
        if (backendImage) {
            formData.append("image", backendImage);
        }

        try {
            const res = await axios.post(`${serverUrl}/api/item/add-item`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });
            console.log("Response:", res.data);
        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
        }
    };





    return (
        <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen'>
            <div className='absolute top-[20px] left-[20px] z-[10] mb-[10px]'>
                <IoArrowBack onClick={() => navigate("/")} size={35} className='text-[#ff4d2d]' />
            </div>

            <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-orange-100 p-4 rounded-full mb-4'>
                        <FaUtensils className='text-[#ff4d2d] w-16 h-16' />
                    </div>
                    <div className='text-3xl font-extrabold text-gray-900'>
                        Add Food
                    </div>


                </div>

                <form className='space-y-5' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input
                            type="text"
                            placeholder='Enter food name'
                            className='w-full px-4 py-2 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Choose Image</label>
                        <input
                            type="file"
                            accept='image/*'
                            className='w-full px-4 py-2 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={handleImage}
                        />
                        {frontendImage &&
                            <div className='mt-4'>
                                <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border' />
                            </div>}

                    </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                        <input
                            type="number"
                            placeholder='0'
                            className='w-full px-4 py-2 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
                        <select
                           
                           
                            className='w-full px-4 py-2 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cate, index)=>(
                                <option value={cate} key={index}>{cate}</option>
                            ))}
                        </select>
                    </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Select Food Type</label>
                        <select
                           
                           
                            className='w-full px-4 py-2 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setFoodType(e.target.value)}
                            value={foodType}
                        >
                            <option value="Veg" >Veg</option>
                            <option value="Non Veg" >Non Veg</option>
                        </select>
                    </div>
                    <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all cursor-pointer'>
                        Save
                    </button>
                </form>
            </div>

        </div>
    )
}

export default AddItem