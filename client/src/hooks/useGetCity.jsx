import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apikey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const result = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
        );

        const location = result?.data?.results?.[0];
       

        // fallback chain
        const city =
          location?.city ||
          location?.district ||
          location?.state_district ||
          location?.county ||
          "Unknown";

       

        dispatch(setCity(city));
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    });
  }, [userData]);
};

export default useGetCity;
