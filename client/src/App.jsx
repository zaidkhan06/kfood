import { Navigate, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import useGetCurrentUser from "./hooks/useGetCurrentUser"
import { useSelector } from "react-redux"
import useGetCity from "./hooks/UseGetCity"

export const serverUrl = "http://localhost:8000"
function App() {
  useGetCurrentUser()
  useGetCity()
  const {userData} = useSelector(state=>state.user)
  

  return (
    <>
    
    <Routes>
      <Route path="/" element={userData?<><Navbar /> <Home /></>:<Navigate to={"/signin"} />} />
       <Route path="/signup" element={!userData?<SignUp />:<Navigate to={"/"} />} />
       <Route path="/signin" element={!userData?<SignIn />:<Navigate to={"/"} />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
    </>
  )
}

export default App
