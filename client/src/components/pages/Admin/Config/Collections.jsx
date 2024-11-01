import React, { useState } from "react";
import pic from "../../../../assets/images/banana.png";
import Recents from "../../../parts/Main/Recents";
import { Edit2, Trash2 } from "lucide-react";

const Collections = () => {

    const collections = [
        {
          id: '01',
          name: 'Summer Fruit',
          category: 'Fruit',
          image: '/api/placeholder/50/50',
          listed: false
        },
        {
          id: '02',
          name: 'Spicy Veg',
          category: 'Vegetables',
          image: '/api/placeholder/50/50',
          listed: true
        }
      ];


  return (
    <>
      <div className="container w-[75%] h-full pt-[56px] my-8 relative ">
        <div className=" w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgb(222,255,247)_0%,rgba(255,0,0,0)_100%);] rounded-tl-[65px] flex justify-center">
          <div className="">



            {/* filter container-------------------------------- */}
            <div className="w-full h-20 flex items-center gap-8">
              {/* saerch field */}
              <div className=" bg-[#ffffff70] py-1 px-5 inline-flex gap-8 rounded-full">
                <input
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="search here"
                />
                <i className="ri-search-2-line text-[25px] text-[#1B453A]"></i>
              </div>

              {/* sort selector */}
              <div className=" bg-[#ffffff70] py-1 px-5 inline-flex gap-8 rounded-full items-center">
                <i className="ri-align-left text-[25px] text-[#1B453A]"></i>
                <p className="font-medium opacity-45">Sort by</p>
                <select
                  className="bg-transparent outline-none custom-selecter"
                  name=""
                  id=""
                >
                  <option value="">Name</option>
                  <option value="">Amount</option>
                  <option value="">Latest</option>
                  <option value="">Oldest</option>
                </select>
              </div>

              {/* order selctor */}
              <div className=" bg-[#ffffff70] py-1 px px-5 inline-flex gap-8 rounded-full items-center">
                <i className="ri-align-justify text-[25px] text-[#1B453A]"></i>
                <p className="font-medium opacity-45">Order</p>
                <select
                  className="bg-[transparent] outline-none custom-selecter"
                  name=""
                  id=""
                >
                  <option value="">Ascending</option>
                  <option value="">Descending</option>
                </select>
              </div>
            </div>



            {/* table------------------------------ */}
            <table className="w-full border-collapse rounded-full mt-5">
              <thead className="py-10">
                <tr className="bg-[linear-gradient(to_right,#60C3A850,#C5D4ED40)] rounded-full text-[#00000070] w-full">
                <th className="px-4 py-3 text-left text-sm text-gray-600 rounded-l-full">S. Number</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Category Type</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Image</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Action</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 rounded-r-full">Update</th>
                </tr>
              </thead>
              <tbody>
                <tr>&nbsp;</tr>

                {/* table contant maper */}
                {collections.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3 text-gray-900 text-[20px] font-bold">{item.id}</td>
                <td className="px-4 py-3 text-gray-900 text-[18px] font-medium">{item.name}</td>
                <td className="px-4 py-3 text-gray-600 text-[18px] font-medium">{item.category}</td>
                <td className="px-4 py-3">
                  <img src={pic} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                </td>
                
                <td className="py-2 px-4 text-center inline">
                      {/* <div className="relative w-20 h-10 bg-gray-800 rounded-full shadow-lg">
                        <div className="absolute top-1/2 left-2 w-5 h-5  rounded-full transform -translate-y-1/2 transition-all duration-300"></div>
                        <div className="absolute top-1/2 right-2 w-7 h-7 bg-gray-700 rounded-full transform -translate-y-1/2"></div>
                        </div> */}
                      <div className="relative w-20 h-10 bg-gray-800 rounded-full shadow-lg">
                        <div className={`absolute top-1/2 left-2 w-5 h-5 ${item.listed?'bg-teal-400':'bg-gray-700'}  rounded-full transform -translate-y-1/2 transition-all duration-300`}></div>
                        <div className={`absolute top-1/2 right-2 w-7 h-2 ${item.listed?'bg-gray-700':'bg-red-700'}  rounded-full transform -translate-y-1/2`}></div>
                      </div>
                    </td>
                        
                          <td className="py-2 px-4 text-center items-center justify-center">
                            <i className="ri-pencil-line text-[30px] opacity-45"></i>
                            &nbsp;&nbsp;&nbsp;
                            <i className="ri-delete-bin-line text-[30px] text-[#F0491B]"></i>
                          </td>

              </tr>
            ))}
              </tbody>
            </table>

            
            {/* pagination nav */}
            <div className="flex justify-end mt-4 absolute bottom-20 left-1/2 translate-x-[-50%]">
              <button className="bg-gray-200 hover:bg-gray-400 text-gray-500 font-bold py-2 px-6 rounded-full">
                Page 01
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full ml-2">
              <i className="ri-skip-right-line text-[22px]"></i>
              </button>
            </div>


          </div>
        </div>
      </div>
      <Recents />
    </>
  );
};

export default Collections;
