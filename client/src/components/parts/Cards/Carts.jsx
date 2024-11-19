import React from "react";
import aplle from "../../../assets/images/aplle.png"

export default function Carts({ data }) {
  
  
  return (
    <div className="p-8 hover:scale-[1.1] duration-500 min-w-72 max-w-72 bg-[linear-gradient(27deg,#f6d3df90,#ffffff50)] rounded-[50px] relative overflow-hidden">
      <div className="w-full h-full flex items-center flex-col">
      <i className="ri-close-line p-[2px] bg-[#00000040] rounded-full absolute left-8 top-8 px-[5px]"></i>
        <img className="w-[50%]" src={data?.product?.pics?.one} alt="" />
        <h1 className="text-[18px] font-bold">{data?.product?.name}</h1>
        <p className="text-green-700 mb-3">{data?.product?.category?.name}</p>
        <div className=" h-8 w-[calc(100%_-_64px)] flex gap-3 mb-3 justify-center items-center">
            <div className="h-full w-12 border-gray-400 border-2 flex justify-center items-center rounded-l-full">
            <i className="ri-add-fill text-[20px] opacity-40"></i>
            </div>
            <div className="h-full w-12 border-gray-400 border-[2px]  flex justify-center items-center rounded-r-full">
            <i className="ri-subtract-line text-[20px] opacity-40"></i> 
            </div>
        </div>
        <p className="w-[calc(100%_-_64px)] text-center bg-[#00000010] font-bold py-[6px] my-2 mt-3 rounded-full">
            <select defaultValue={data?.quanatity} className="outline-none bg-transparent ">
                <option value="500gm">500gm</option>
                <option value="1 kg">1Kg</option>
                <option value="2 kg">2 kg</option>
                <option value="3 kg">3 kg</option>
            </select>
        </p>
        <p className="w-[calc(100%_-_64px)] text-center py-[6px] bg-[#ffffff50] my-2 rounded-full">Buy now</p>
 
      </div>
    </div>
  );
}
