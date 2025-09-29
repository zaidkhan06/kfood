import React, { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { setmyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';

const CreateEditShop = () => {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner);
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user);

    const [name, setName] = useState(myShopData?.name || "");
    const [address, setAddress] = useState(myShopData?.address || currentAddress);
    const [city, setCity] = useState(myShopData?.city || currentCity);
    const [state, setState] = useState(myShopData?.state || currentState);
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || "");
    const [backendImage, setBackendImage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        if (backendImage) formData.append("image", backendImage);

        try {
            const res = await axios.post(`${serverUrl}/api/shop/create-edit`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            setName("");
            setAddress("");
            setCity("");
            setState("");
            setFrontendImage("");
            navigate("/");
            setLoading(false);
        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col items-center justify-start relative p-4">
            {/* Back Button */}
            <IoArrowBack
                onClick={() => navigate("/")}
                size={35}
                className='absolute top-6 left-6 text-[#ff4d2d] cursor-pointer hover:scale-110 transition-transform'
            />

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 mt-12">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-gradient-to-r from-[#ff9966] to-[#ff4d2d] p-4 rounded-full mb-4 shadow-lg">
                        <FaUtensils className='text-white w-16 h-16' />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">{myShopData ? "Edit Shop" : "Add Shop"}</h1>
                    <span className="w-20 h-[3px] bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] mt-2 rounded-full"></span>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Shop Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                        <input
                            type="text"
                            placeholder="Enter shop name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all shadow-sm"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Shop Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all shadow-sm"
                        />
                        {frontendImage && (
                            <div className="mt-4 w-full h-48 overflow-hidden rounded-xl shadow-md border border-gray-200">
                                <img src={frontendImage} alt="Shop" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">State</label>
                            <input
                                type="text"
                                placeholder="Enter State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            placeholder="Enter shop address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all shadow-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-[#ff4d2d] to-[#ff9966] rounded-xl text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform flex justify-center items-center gap-2"
                    >
                        {loading ? <ClipLoader size={20} color="white" /> : "Save Shop"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEditShop;
