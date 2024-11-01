import React, { useState } from "react";
import pic from "../../../../assets/images/plp.png";
import Recents from "../../../parts/Main/Recents";

const ProductManage = () => {

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
      <div className="container w-[100%] h-full pt-[56px] my-8 relative ">
        <div className=" w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgb(237,248,255)_0%,rgba(255,0,0,0)_100%);] rounded-tl-[65px] flex justify-center relative">
          <div className="">



            {/* Head */}
          <span className="flex justify-center items-center flex-col my-8">
          <h1 className="text-[30px] font-bold">Update Product Details</h1>
          <p className="text-center opacity-45 px-80">This message prompts the admin to carefully review and confirm any updates to a product's details. It serves as a final check to ensure accuracy in pricing, descriptions, and inventory before the changes are saved and displayed to users. The confirmation reduces the likelihood of errors, helping maintain a smooth and professional experience for customers.</p>
          </span>

          <span className="flex h-full w-full gap-20 justify-center items-center mt-28">

          {/* image picker */} 
          <span className="flex-col self-start mt-10">
          <img className="w-20 h-20 mb-10" src={pic} alt="" />
          <img className="w-20 h-20 mb-10" src={pic} alt="" />
          <img className="w-20 h-20 mb-10" src={pic} alt="" />
          </span>
         
            <span className="h-full">
 
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
                className="w-full outline-none min-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px] "
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
                  className="w-52 py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
                  name=""
                  id=""
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </span>
              {/* Collection */}
              <span className="flex flex-col flex-1 gap-1">
                <label
                  className="font-bold opacity-55 w-full max-w-[420px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Collection
                </label>

                <select
                  className="w-52 py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
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
                className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-[20px] text-[18px] pb-20"
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
                  className="w-full outline-none max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
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
                  className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="Techno"
                />
              </span>
            </div>

          </div>
            </span>
            
            {/* next col */}
            <span className="flex flex-col gap-5 items-center self-start">
               {/* stock */}
            <span className="flex flex-col gap-1">
                <label
                  className="font-bold opacity-55 w-full max-w-[200px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Regular price
                </label>
                <input
                  className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="Techno"
                />
              </span>

               {/* freshness */}
              <span className="flex flex-col gap-1 ">
                <label
                  className="font-bold opacity-55 w-full max-w-[420px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Freshness
                </label>

                <select
                  className="w-[250px] py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
                  name=""
                  id=""
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </span>
              {/* harvest */}
            <span className="flex flex-col gap-1">
                <label
                  className="font-bold opacity-55 w-full max-w-[200px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Regular price
                </label>
                <input
                  className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="Techno"
                />
              </span>
              {/* from */}
              <span className="flex flex-col gap-1">
                <label
                  className="font-bold opacity-55 w-full max-w-[200px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Regular price
                </label>
                <input
                  className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="Techno"
                />
              </span>

              <button className="px-0 py-[15px] bg-[linear-gradient(to_left,#4573B8,#59A5D4)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]">
              Logout
            </button>

            </span>

          </span>


          {/* navigate to back */}
          <div className="flex absolute top-8 left-10 items-center justify-center bg-red opacity-55 hover:text-[59A5D4] hover:opacity-100 cursor-pointer">
          <i className="ri-arrow-left-s-fill text-[35px]"></i>
          <p className="text-[18px] translate-y-[-2px] font-medium">Products</p>
          </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManage;
