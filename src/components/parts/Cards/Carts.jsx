import React from "react";
import aplle from "../../../assets/images/aplle.png"

export default function Carts({ col }) {
  return (
    <div className="h-80 p-8 min-w-60 max-w-60 bg-[linear-gradient(27deg,#f6d3df,#ffffff)] rounded-[50px] relative overflow-hidden">
      <div className="w-full h-full flex items-center flex-col">
      <i className="ri-close-line p-[2px] bg-[#00000040] rounded-full absolute left-8 top-8 px-[5px]"></i>
        <img className="w-[50%]" src={aplle} alt="" />
        <h1 className="text-[18px] font-bold">Gala Apple</h1>
        <p className="text-green-700">Fruit</p>
        <div className=" h-8 w-[calc(100%_-_64px)] flex gap-3 justify-center items-center">
            <div className="h-full w-12 border-gray-400 border-2 flex justify-center items-center rounded-l-full">
            <i className="ri-add-fill text-[20px] opacity-40"></i>
            </div>
            <p className="font-bold">01</p>
            <div className="h-full w-12 border-gray-400 border-[2px] flex justify-center items-center rounded-r-full">
            <i className="ri-subtract-line text-[20px] opacity-40"></i> 
            </div>
        </div>
        <p className="w-[calc(100%_-_64px)] text-center py-[2px] bg-gray-300 my-2 mt-3 rounded-full">
            <select className="outline-none bg-transparent ">
                <option value="500gm">500gm</option>
                <option value="1 kg">1 kg</option>
                <option value="2 kg">2 kg</option>
                <option value="3 kg">3 kg</option>
            </select>
        </p>
        <p className="w-[calc(100%_-_64px)] text-center py-[2px] bg-red-200 my-2 rounded-full">Buy now</p>
 
      </div>
    </div>
  );
}
