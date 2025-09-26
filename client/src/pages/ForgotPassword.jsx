import axios from 'axios';
import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners"



const ForgotPassword = () => {
    const navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setotp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
     const [error, setError] = useState("");

    const handleSendOtp = async () => {
        if(!email){
            return setError("Enter a email")
        }
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/api/auth/send-otp`, {email},
                {withCredentials:true}
            )
            setError("")
            setLoading(false);
            setStep(2)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
            
        }

    }
    const handleVerifyOtp = async () => {
        if(!otp){
            return setError("Enter a valid otp")
        }
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/api/auth/verify-otp`, {email, otp},
                {withCredentials:true}
            )
            setError("")
            setLoading(false);
            setStep(3)
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message)
            
        }

    }
    const handleResetPassword = async () => {
        if(newPassword!=confirmPassword){
            return setError("Password does not match")
            
        }
        setLoading(true)
        try {
            const res = await axios.post(`${serverUrl}/api/auth/reset-password`, {email, newPassword},
                {withCredentials:true}
            )
            setError("")
            setLoading(false);
            navigate("/signin")
        } catch (error) {
            setLoading(false);
             setError(error.response.data.message)
        }

    }







    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 mb-4'>
                <div className='flex items-center gap-4 '>
                    <Link to="/signin"> <IoMdArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' /> </Link>
                    <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
                </div>
                {step == 1
                    &&
                    <div>
                        <div className='mt-6 mb-6'>
                            <label htmlFor="email"></label>
                            <input
                                type="email"
                                required
                                title="Enter a valid email address"
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 '
                            />
                        </div>
                        <button onClick={handleSendOtp} disabled={loading}  className='w-full mt-2 flex items-center justify-center gap-2  rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white cursor-pointer'>
                             {loading?<ClipLoader size={24} color='#ffff' />:"Send Otp"}
                        </button>
                        <p className='text-red-500 text-center'>{error}</p>
                    </div>
                }
                {step == 2
                    &&
                    <div>
                        <div className='mt-6 mb-6'>
                            <label htmlFor="otp"></label>
                            <input
                                type="password"
                                required
                                title="Enter a valid one time password"
                                placeholder='Enter OTP'
                                onChange={(e) => setotp(e.target.value)}
                                value={otp}
                                className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 '
                            />
                        </div>
                        <button onClick={handleVerifyOtp} disabled={loading}  className='w-full mt-2 flex items-center justify-center gap-2  rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white cursor-pointer'>
                           {loading?<ClipLoaders size={24} color='#ffff' />:"Verify"}
                        </button>
                         <p className='text-red-500 text-center'>{error}</p>
                    </div>
                }
                {step == 3
                    &&
                    <div>
                        <div className='mt-6 mb-6'>
                            <label htmlFor="new-password"></label>
                            <input
                                type="password"
                                required
                                title="Enter a  new password"
                                placeholder='New password'
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 mb-4'
                            />
                            <label htmlFor="confirm-password"></label>
                            <input
                                type="password"
                                required
                                title="confirm new password"
                                placeholder='Confirm password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 '
                            />
                        </div>
                        <button onClick={handleResetPassword} disabled={loading}  className='w-full mt-2 flex items-center justify-center gap-2  rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white cursor-pointer'>
                            {loading?<ClipLoader size={24} color='#ffff' />:"Reset password"}
                        </button>
                         <p className='text-red-500 text-center'>{error}</p>
                    </div>
                }
            </div>


        </div>
    )
}

export default ForgotPassword