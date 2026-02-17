import React from 'react'
import { FaLeaf } from "react-icons/fa6";
import { FaDrumstickBite } from "react-icons/fa6";


const FoodCard = ({data}) => {
  return (
    <div className='w-62.5 rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
      <div className='relative w-full h-42.5 flex justify-center items-center bg-white'>
        <div className='absolute top-3 right-3 bg-white rounded-full p-1 shadow'>
            {data.foodType=="Veg"?<FaLeaf className='text-green-600 text-lg'/>:<FaDrumstickBite className='text-red-600 text-lg'/>}
        </div>
        <img src ={data.image} alt="" className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'/>
      </div>

    </div>
  )
}

export default FoodCard