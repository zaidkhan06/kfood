import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"
import Navbar from "./components/Navbar"
import Home from "./components/Home"

export const serverUrl = "http://localhost:8000"
function App() {
  

  return (
    <>
    
    <Routes>
      <Route path="/" element={<><Navbar /> <Home /></> } />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/signin" element={<SignIn />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
    </>
  )
}

export default App
