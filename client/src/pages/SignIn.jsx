import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import axios from "axios";
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  let [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch(); 


  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    try {
      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
        email: result.user.email,
        


      }, { withCredentials: true })
      dispatch(setUserData(data))

    } catch (error) {
       setError(error?.response?.data?.message)


    }
  }


  const handleSignIn = async () => {
    // Basic frontend validation before sending
    if (!email || !password) {
      setError("Please fill all required fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );


      alert("Sign in successful!");
      dispatch(setUserData(res.data))
      setEmail("");
      setPassword("");
      setError("")
      setLoading(false)

      // Optionally redirect to login page
    } catch (error) {
      setLoading(false)
      setError(error?.response?.data?.message)
    }
  };


  // const primaryColor = "#ff4d2d";
  // const hoverColor = "#e64323";
  // const bgColor = "#fff9f6";
  // const borderColor = "#ddd";
  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bgcolor'>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-1 bordercolor">
        <h1 className="text-3xl font-bold mb-2 primarycolor">Kfood</h1>
        <p className='text-gray-800 mb-8'>Sign in to your account to get started with delicious food deliveries </p>

        {/* email */}
        <div className='mb-4'>
          <label htmlFor="email"></label>
          <input
            type="email"
            required
            title="Enter a valid email address"
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 ' />
        </div>


        {/* password */}
        <div className='mb-4'>
          <label htmlFor="password"></label>
          <div className='relative'>
            <input
              type={`${showPassword ? "text" : "password"}`}
              pattern="(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}"
              title="Must be at least 8 characters, include one uppercase letter, and one number"
              placeholder="Password"
              minLength={6}
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full border-1 rounded-lg px-3 py-2  focus:outline-none focus:border-orange-500 border-gray-500 ' />
            <button onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer'>{!showPassword ? <IoIosEyeOff /> : <IoIosEye />}</button>

          </div>



        </div>

        <div className='text-right mb-4 text-[#ff4d2d] cursor-pointer'>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>

        <button onClick={handleSignIn} disabled={loading} className='w-full mt-2 flex items-center justify-center gap-2  rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white cursor-pointer'>
         {loading?<ClipLoader size={24} color='#ffff' />:"Sign In"}
        </button>
        <p className='flex text-red-500 text-center'>{error}</p>
        <button onClick={handleGoogleAuth} className='cursor-pointer w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100'>
          <FcGoogle size={20} />
          <span>Sign in with google</span>
        </button>
        <Link to="/signup" className='flex justify-center text-center mt-6 cursor-pointer gap-0.5'>Want to create a new account? <span className='text-[#ff4d2d] '>Sign Up</span></Link>


      </div>

    </div>
  )
}

export default SignIn