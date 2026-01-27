import React, {use, useEffect} from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, setUserData } from '../redux/userSlice.js';

const useGetCity = () => {
  const dispatch=useDispatch()
  const {userData} = useSelector((state) => state.user);
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords;
        const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
        dispatch(setCity(res?.data?.results[0].city))
    })
  },[userData])
}

export default useGetCity