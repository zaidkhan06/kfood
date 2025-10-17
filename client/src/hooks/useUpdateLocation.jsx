import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from '../App';
import { useSelector } from "react-redux"; 

const useUpdateLocation = () => {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    
    let watchId;

    const updateLocation = async (lat, lon) => {
      try {
        
        if (userData) {
          await axios.post(
            `${serverUrl}/api/user/update-location`,
            { lat, lon },
            { withCredentials: true }
          );
        }
      } catch (error) {
        
        console.error("Failed to update location:", error);
      }
    };

    
    if (userData) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          updateLocation(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
       
          console.error("Geolocation error:", err);
        },
        {
         
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }

   
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [userData, serverUrl]); 
};

export default useUpdateLocation;