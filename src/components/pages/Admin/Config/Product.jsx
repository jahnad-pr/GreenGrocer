import React, { useState } from "react";
import pic from "../../../../assets/images/banana.png";
import Recents from "../../../parts/Main/Recents";

const Productes = () => {

  const [products] = useState([
    {
      id: "01",
      name: "Gaia Apple",
      category: "Fruit",
      description: "Best for blood",
      subCategory: "Apple | Blood special",
      price: {
        original: 112,
        discounted: 78
      },
      status: "Sahlu's farm Fresh",
      quantity: 150,
      unit: "KG",
      listed: true
    },
    {
      id: "02",
      name: "Beetroot",
      category: "Vegetable",
      description: "Best for blood",
      subCategory: "blood beast",
      price: {
        original: 85,
        discounted: 66
      },
      status: "Sahlu's farm 2 house",
      quantity: 20,
      unit: "KG",
      listed: true
    },
    {
      id: "03",
      name: "Pineapple",
      category: "Fruit",
      description: "sweety one",
      subCategory: "summer | water content",
      price: {
        original: 75,
        discounted: 50
      },
      status: "Sahlu's farm Fresh",
      quantity: 50,
      unit: "KG",
      listed: false
    }
  ]);


  return (
    <>
      <div className="container w-[75%] h-full pt-[56px] my-8 relative ">
        <div className=" w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgb(237,248,255)_0%,rgba(255,0,0,0)_100%);] rounded-tl-[65px] flex justify-center">
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
                <i className="ri-search-2-line text-[25px] text-[#1F7BAD]"></i>
              </div>

              {/* sort selector */}
              <div className=" bg-[#ffffff70] py-1 px-5 inline-flex gap-8 rounded-full items-center">
                <i className="ri-align-left text-[25px] text-[#1F7BAD]"></i>
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
                <i className="ri-align-justify text-[25px] text-[#1F7BAD]"></i>
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
                <tr className="bg-[linear-gradient(to_right,#498CFF24,#CBD8EE23)] rounded-full text-[#00000070] w-full">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-l-full">S. Number</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">From</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Pic</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Listed</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-r-full">Updates</th>
                </tr>
              </thead>
              <tbody>
                <tr>&nbsp;</tr>

                {/* table contant maper */}
                {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-bold text-gray-900 text-[20px]">{product.id}</td>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-gray-900 text-[18px]">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.description}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-gray-900 text-[16px]">{product.category}</div>
                    <div className="text-sm text-gray-500">{product.subCategory}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm text-gray-500 line-through">₹{product.price.original}</div>
                    <div className="font-bold text-gray-600 text-[20px]">₹{product.price.discounted}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">{product.status}</td>
                <td className="px-4 py-4 text-gray-900 tetx-[20px] font-bold">{product.quantity}{product.unit}</td>
                <td className="px-4 py-4">
                  <img src={pic} alt="Product" className="h-10 w-10 rounded-full" />
                </td>
                  
                <td className="py-2 px-4 text-center inline">
                      {/* <div className="relative w-20 h-10 bg-gray-800 rounded-full shadow-lg">
                        <div className="absolute top-1/2 left-2 w-5 h-5  rounded-full transform -translate-y-1/2 transition-all duration-300"></div>
                        <div className="absolute top-1/2 right-2 w-7 h-7 bg-gray-700 rounded-full transform -translate-y-1/2"></div>
                        </div> */}
                      <div className="relative w-20 h-10 bg-gray-800 rounded-full shadow-lg">
                        <div className={`absolute top-1/2 left-2 w-5 h-5 ${product.listed?'bg-teal-400':'bg-gray-700'}  rounded-full transform -translate-y-1/2 transition-all duration-300`}></div>
                        <div className={`absolute top-1/2 right-2 w-7 h-2 ${product.listed?'bg-gray-700':'bg-red-700'}  rounded-full transform -translate-y-1/2`}></div>
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

export default Productes;
