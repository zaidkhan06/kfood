import React, { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { setmyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';

const AddItem = () => {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("Veg");
    const categories = ["Snacks", "Main Course", "Desserts", "Pizza", "Burgers", "Sandwiches", "South Indian", "North Indian", "Chinese", "Fast Food", "Others"];
    const [name, setName] = useState("");
    const [frontendImage, setFrontendImage] = useState("");
    const [backendImage, setBackendImage] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("foodType", foodType);
        formData.append("price", price);
        if (backendImage) formData.append("image", backendImage);

        try {
            const res = await axios.post(`${serverUrl}/api/item/add-item`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            dispatch(setmyShopData(res.data));
            setName(""); setCategory(""); setFoodType("Veg"); setPrice(""); setFrontendImage(""); setBackendImage("");
            navigate("/");
        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen relative'>
            <IoArrowBack 
                onClick={() => navigate("/")} 
                size={35} 
                className='absolute top-8 left-8 text-[#ff4d2d] cursor-pointer hover:scale-110 transition-transform duration-300' 
            />

            <div className='max-w-lg w-full bg-white shadow-2xl rounded-3xl p-8 border border-orange-100 hover:shadow-3xl transition-shadow duration-300'>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-gradient-to-r from-[#ff9966] to-[#ff4d2d] p-4 rounded-full mb-4 shadow-lg'>
                        <FaUtensils className='text-white w-16 h-16 sm:w-20 sm:h-20' />
                    </div>
                    <h2 className='text-3xl font-extrabold text-gray-900'>Add Food</h2>
                </div>

                <form className='space-y-5' onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input
                            type="text"
                            placeholder='Enter food name'
                            className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Choose Image</label>
                        <input
                            type="file"
                            accept='image/*'
                            className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm'
                            onChange={handleImage}
                        />
                        {frontendImage && (
                            <div className='mt-4'>
                                <img src={frontendImage} alt="Food" className='w-full h-52 object-cover rounded-xl border shadow-sm' />
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                        <input
                            type="number"
                            placeholder='0'
                            className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
                        <select
                            className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cate, idx) => <option key={idx} value={cate}>{cate}</option>)}
                        </select>
                    </div>

                    {/* Food Type */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Select Food Type</label>
                        <select
                            className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm'
                            value={foodType}
                            onChange={(e) => setFoodType(e.target.value)}
                        >
                            <option value="Veg">Veg</option>
                            <option value="Non Veg">Non Veg</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex justify-center items-center gap-2'
                    >
                        {loading ? <ClipLoader size={18} color='white' /> : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
