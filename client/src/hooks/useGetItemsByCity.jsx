import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity } from '../redux/userSlice'

const useGetItemsByCity = () => {
  const dispatch = useDispatch();
  const { currentCity,  userData} = useSelector(state => state.user);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!currentCity || !userData) return; // prevent API call if city not ready

        const result = await axios.get(
          `${serverUrl}/api/item/get-by-city/${encodeURIComponent(currentCity)}`, 
          { withCredentials: true }
        );

        dispatch(setItemsInMyCity(result.data));
      } catch (error) {
        console.error("Error fetching items by city:", error.response?.data || error.message);
      }
    };

    fetchItems();
  }, [currentCity, dispatch]);
  
};

export default useGetItemsByCity;
