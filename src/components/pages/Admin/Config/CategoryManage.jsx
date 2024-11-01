import React, { useState } from "react";
import pic from "../../../../assets/images/banana.png";
import Recents from "../../../parts/Main/Recents";
import { Edit2, Trash2 } from "lucide-react";

const CategoryManage = () => {
  const collections = [
    {
      id: "01",
      name: "Summer Fruit",
      category: "Fruit",
      image: "/api/placeholder/50/50",
      listed: false,
    },
    {
      id: "02",
      name: "Spicy Veg",
      category: "Vegetables",
      image: "/api/placeholder/50/50",
      listed: true,
    },
  ];

  return (
    <>
      <div className="container w-[75%] h-full pt-[56px] my-8 relative ">
        <div className=" w-full h-full bg-[radial-gradient(circle_at_0%_1%,_rgb(182_233_175)_0%,_rgb(173,216,230,50%)_30%,_rgba(255,0,0,0)_100%)] rounded-tl-[65px] flex justify-center relative">
          <div className="">
            {/* Head */}
            <span className="flex justify-center items-center flex-col my-8">
              <h1 className="text-[30px] font-bold">Manage Category</h1>
              <p className="text-center opacity-45 px-80">
                Admins can edit Category details, including changing the
                Category name, updating descriptions, and adjusting associated
                products. Ensure all information is accurate to maintain a clear
                and organized structure. Save changes to implement the updates
                across the platform immediately
              </p>
            </span>

            <span className="flex h-full w-full gap-20 justify-center items-center mt-16">
              {/* image picker */}
              <span className="flex-col self-start mt-32 items-center justify-center">
                <img className="w-72 mb-10" src={pic} alt="" />
              </span>

              <span className="h-full flex flex-col items-center justify-center">
                {/* editer */}
                <div className="flex-1 h-10 w-full flex flex-col items-center  gap-5">
                  {/* Name */}
                  <div className="flex-col flex gap-1">
                    <label
                      className="font-bold opacity-55 w-full max-w-[410px] ml-2"
                      htmlFor=""
                    >
                      Product Name
                    </label>
                    <input
                      className="w-full outline-none min-w-[500px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px] "
                      type="text"
                      placeholder="shalu"
                    />
                  </div>


                    <span className="flex gap-5">
                  {/* add porduct */}
                  <div className="w-28 h-32 bg-red-500 p-3 items-center justify-center flex flex-col gap-3 rounded-[30px]">
                    <div className="w-full h-24 bg-gray-100 rounded-[25px]"></div>
                    <p className="font-medium text-[14px]">Add Product</p>
                  </div>

                  {/* add porduct */}
                  <div className="w-28 h-32 bg-red-500 p-3 items-center justify-center flex flex-col gap-3 rounded-[30px]">
                    <div className="w-full h-24 bg-gray-100 rounded-[25px]"></div>
                    <p className="font-medium text-[14px]">Collection</p>
                  </div>

                  {/* cooll lis */}
                    <div className="h-32 w-56 border-[2px]  border-blue-400 rounded-3xl p-2 pt-3">
                        <p className="p-2 bg-gray-300 inline rounded-full text-[12px]">Collection name</p>
                    </div>

                    </span>

                    <div className="w-full h-40 border-green-400 border-[2px] rounded-3xl mt-5 overflow-hidden p-2">
                        <div className="w-16 h-16 bg-green-300 border-green-400 border-[2px] rounded-xl">
                            <img src={pic} alt="" />
                        </div>
                    </div>
                    

                  <button className="px-0 py-[15px] bg-[linear-gradient(to_left,#8CC850,#1F9C64)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]">
                    Update
                  </button>
                </div>

                
                


              </span>
            </span>

            {/* navigate to back */}
            <div className="flex absolute top-8 left-10 items-center justify-center bg-red opacity-55 hover:text-[59A5D4] hover:opacity-100 cursor-pointer">
              <i className="ri-arrow-left-s-fill text-[35px]"></i>
              <p className="text-[18px] translate-y-[-2px] font-medium">
                Categories
              </p>
            </div>
          </div>
        </div>
      </div>
      <Recents />
    </>
  );
};

export default CategoryManage;
