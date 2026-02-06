import React, { useRef } from "react";
import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const UserDashboard = () => {
  const cateScrollRef = useRef()
  return (
    <div className="w-screen mih-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Nav />
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          What are you craving today?
        </h1>
        <div className="w-full relative">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 ">
            <FaArrowCircleLeft />
          </button>
          <div className="w-full flex overflow-x-auto gap-4 pb-2" ref={cateScrollRef}>
            {categories.map((cat, index) => (
              <CategoryCard data={cat} key={index} />
            ))}
          </div>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 ">
            <FaArrowCircleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
