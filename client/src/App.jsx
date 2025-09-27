import { Navigate, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import useGetCurrentUser from "./hooks/useGetCurrentUser"
import { useSelector } from "react-redux"
import useGetCity from './hooks/useGetCity'
import useGetMyShop from "./hooks/useGetMyShop"
import CreateEditShop from "./pages/CreateEditShop"
import AddItem from "./pages/AddItem"


export const serverUrl =
  import.meta.env.VITE_MODE === "development"
    ? "http://localhost:8000"
    : "https://kfood.onrender.com";

function App() {
 
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  const {userData} = useSelector(state=>state.user)
  

  return (
    <>
    
    <Routes>
      <Route path="/" element={userData?<><Home /></>:<Navigate to={"/signin"} />} />
       <Route path="/signup" element={!userData?<SignUp />:<Navigate to={"/"} />} />
       <Route path="/signin" element={!userData?<SignIn />:<Navigate to={"/"} />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/create-edit-shop" element={userData?<CreateEditShop />: <Navigate to={"/signin"} />} />
       <Route path="/add-item" element={userData?<AddItem />: <Navigate to={"/signin"} />} />
    </Routes>
    </>
  )
}

export default App
