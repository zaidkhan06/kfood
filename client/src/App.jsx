import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Navbar from "./components/Navbar"
import Home from "./components/Home";


function App() {
  

  return (
    <>
    <Navbar />
    <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/signin" element={<SignIn />} />
    </Routes>
    </>
  )
}

export default App
