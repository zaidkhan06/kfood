import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user")
    // const primaryColor = "#ff4d2d";
    // const hoverColor = "#e64323";
    // const bgColor = "#fff9f6";
    // const borderColor = "#ddd";
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 bgcolor'>
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-1 bordercolor">
                <h1 className="text-3xl font-bold mb-2 primarycolor">Kfood</h1>
                <p className='text-gray-800 mb-8'>Create your account to get started with delicious food deliveries </p>

                {/* fullName */}
                <div className='mb-4'>
                    <label htmlFor="fullName"></label>
                    <input
                        type="text"
                        required
                        placeholder='Full Name'
                        className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 ' />
                </div>
                {/* email */}
                <div className='mb-4'>
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        required
                        title="Enter a valid email address"
                        placeholder='Email'
                        className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 ' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="mobile"></label>
                    <input
                        type="tel"
                        required
                        pattern='[6-9]{1}{0-9}{9}'
                        maxLength={10}
                        title="Enter a valid 10-digit Indian mobile number"
                        placeholder='Phone number'
                        min={10}
                        className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 ' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="password"></label>
                    <div className='relative'>
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            pattern="(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}"
                            title="Must be at least 8 characters, include one uppercase letter, and one number"
                            placeholder="Password"
                            min={10}
                            className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 ' />
                        <button onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer'>{!showPassword ? <IoIosEyeOff /> : <IoIosEye />}</button>

                    </div>

                </div>
                <div className='mb-4'>
                    <label htmlFor="role"></label>
                    <div className='flex gap-2'>
                        {["User", "Owner", "Rider"].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                className={`flex-1 border-1 rounded-lg px-3 py-2 text-center font-medium transition-colors duration-700 cursor-pointer
                                    ${role === r
                                        ? "bg-[#ff4d2d] text-white"
                                        : "bg-white text-gray-500 border-gray-500"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
                <button className='w-full mt-4 flex items-center justify-center gap-2  rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white cursor-pointer'>
                    Sign Up
                </button>
                <button>
                    
                </button>


            </div>

        </div>
    )
}

export default SignUp