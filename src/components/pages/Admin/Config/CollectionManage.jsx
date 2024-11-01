import React, { useState } from "react";
import pic from "../../../../assets/images/banana.png";
import Recents from "../../../parts/Main/Recents";
import { Edit2, Trash2 } from "lucide-react";

const CollectionManage = () => {
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
        <div className=" w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgb(222,255,247)_0%,rgba(255,0,0,0)_100%);] rounded-tl-[65px] flex justify-center relative">
          <div className="">
            {/* Head */}
            <span className="flex justify-center items-center flex-col my-8">
              <h1 className="text-[30px] font-bold">Manage Collection</h1>
              <p className="text-center opacity-45 px-80">
                Admins can edit collection details, including changing the
                collection name, updating descriptions, and adjusting associated
                products. Ensure all information is accurate to maintain a clear
                and organized structure. Save changes to implement the updates
                across the platform immediately.
              </p>
            </span>

            <span className="flex h-full w-full gap-20 justify-center items-center mt-16">
              {/* image picker */}
              <span className="flex-col self-start mt-20 items-center justify-center">
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
                      className="w-full outline-none min-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-full text-[18px] "
                      type="text"
                      placeholder="shalu"
                    />
                  </div>
                  {/* tag name and phone */}
                  <div className="flex gap-8">
                    {/* Category */}
                    <span className="flex flex-col flex-1 gap-1">
                      <label
                        className="font-bold opacity-55 w-full max-w-[420px] ml-2"
                        htmlFor=""
                      >
                        &nbsp;&nbsp;Category
                      </label>

                      <select
                        className="w-[450px] py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#AAEACD]"
                        name=""
                        id=""
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </span>
                  </div>
                  {/* email */}
                  <div className="flex-col flex gap-1">
                    <label
                      className="font-bold opacity-55 w-full min-w-[450px] ml-2"
                      htmlFor=""
                    >
                      Descriptionn
                    </label>
                    <input
                      className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-[20px] text-[18px] pb-20"
                      type="text"
                      placeholder="shalu@gmail.com"
                    />
                  </div>

                  {/* place and gender*/}
                  <div className="flex gap-8">
                    <span className="flex flex-col gap-1">
                      <label
                        className="font-bold opacity-55 w-full max-w-[200px] ml-2"
                        htmlFor=""
                      >
                        &nbsp;&nbsp;Regular price
                      </label>
                      <input
                        className="w-full outline-none max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-full text-[18px]"
                        type="text"
                        placeholder="Techno"
                      />
                    </span>
                    {/* Gender */}
                    <span className="flex flex-col gap-1">
                      <label
                        className="font-bold opacity-55 w-full max-w-[200px] ml-2"
                        htmlFor=""
                      >
                        &nbsp;&nbsp;Sale Price
                      </label>
                      <input
                        className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-full text-[18px]"
                        type="text"
                        placeholder="Techno"
                      />

                    </span>
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
                Collections
              </p>
            </div>
          </div>
        </div>
      </div>
      <Recents />
    </>
  );
};

export default CollectionManage;
