import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAddress, setCurrentCity, setCurrentState } from "../redux/userSlice";
import { setAddress, setLocation } from "../redux/mapSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apikey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch(setLocation({ lat: latitude, lon: longitude }));

        const result = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
        );
       

        const location = result?.data?.results?.[0];

        // City fallback logic
        const city =
          location?.city ||
          location?.county ||
          location?.district ||
          location?.state_district ||
          "Unknown";

        const address = location?.address_line2 || location?.address_line1 || "Unknown Address";

        dispatch(setCurrentCity(city));
        dispatch(setCurrentState(location?.state || "Unknown State"));
        dispatch(setCurrentAddress(address));
        dispatch(setAddress(address));

      } catch (error) {
        console.error("Error fetching city:", error);
      }
    });
  }, [userData]);
};

export default useGetCity;
