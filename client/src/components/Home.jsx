import React from "react";
import heroImage from "../assets/foodImage.jpg"; // Put your hero image in src/assets folder
import { useSelector } from "react-redux";
import UserDashBoard from "./UserDashBoard";
import OwnerDashBoard from "./OwnerDashBoard";
import RiderDashboard from "./RiderDashboard";

const Home = () => {
  const {userData} = useSelector(state=>state.user)
  return (
    <div className="w-screen min-h-screen pt-24 flex flex-col items-center bg-[#fff9f6]">
      {userData.role == "User" && <UserDashBoard/>}
      {userData.role == "Owner" && <OwnerDashBoard/>}
      {userData.role == "Rider" && <RiderDashboard/>}
      
    </div>
  );
};

export default Home;
