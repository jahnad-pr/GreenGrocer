import React from "react";
import pic from "../../../../assets/images/pico.jpeg";
import Recents from "../../../parts/Main/Recents";
import picr from "../../../../assets/images/picr.png";
import ind from "../../../../assets/images/indicator.png";

const UserManage = () => {

  const users = [
    {
      id: "01",
      name: "Devloper",
      email: "Devloper@gmail.com",
      number: "+91 8978453458",
      access: true,
      update: true,
    },
    {
      id: "02",
      name: "Shubham",
      email: "shubham@gmail.com",
      number: "+91 87453342312",
      access: false,
      update: true,
    },
  ];


  return (
    <>
      <div className="container w-[100%] h-full pt-[56px] my-8 relative ">
        <div className=" w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgba(246,237,231,1)_0%,rgba(255,0,0,0)_100%);] rounded-tl-[65px] flex items-center justify-center flex-col relative">

          {/* Head */}
          <span className="flex justify-center items-center flex-col my-8">
          <h1 className="text-[30px] font-bold">Manage Profile</h1>
          <p className="text-center opacity-45">Make sure your information is accurate and up to date.<br/>You can edit your details below  save the changes when you're ready</p>
          </span>

          {/* image picker */}
          <img className="w-32 h-32 mb-10 rounded-full" src={pic} alt="" />
         

          {/* editer */}
          <div className="flex-1 h-10 w-full flex flex-col items-center  gap-5">
            {/* Name */}
            <div className="flex-col flex gap-1">
              <label
                className="font-bold opacity-55 w-full max-w-[410px] ml-2"
                htmlFor=""
              >
                User Name
              </label>
              <input
                className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#D6D1D1,#f5efef)] rounded-full text-[18px] "
                type="text"
                placeholder="shalu"
              />
            </div>
            {/* tag name and phone */}
            <div className="flex gap-8">
              <span className="flex flex-col gap-1">
                <label
                  className="font-bold opacity-55 w-full max-w-[200px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Tag Name
                </label>
                <input
                  className="w-full outline-none max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#D6D1D1,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="@shalu"
                />
              </span>
              {/* phone */}
              <span className="flex flex-col flex-1 gap-1">
                <label
                  className="font-bold opacity-55 w-full max-w-[420px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Phone
                </label>

                <input
                  className="w-full outline-none max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#D6D1D1,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="+918978XXXXXX"
                />
              </span>
            </div>
            {/* email */}
            <div className="flex-col flex gap-1">
              <label
                className="font-bold opacity-55 w-full max-w-[420px] ml-2"
                htmlFor=""
              >
                Email
              </label>
              <input
                className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#D6D1D1,#f5efef)] rounded-full text-[18px]"
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
                  &nbsp;&nbsp;Place
                </label>
                <input
                  className="w-full outline-none max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#D6D1D1,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="Techno"
                />
              </span>
              {/* Gender */}
              <span className="flex flex-col flex-1 gap-1">
                <label
                  className="font-bold opacity-55 w-full max-w-[420px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Gender
                </label>

                <select
                  className="w-52 py-3 px-5 rounded-full text-[18px] custom-select"
                  name=""
                  id=""
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </span>
            </div>

            <button className="px-0 py-[15px] bg-[linear-gradient(to_left,#DDBE95,#A07601)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]">
              Logout
            </button>
          </div>

          {/* navigate to back */}
          <div className="flex absolute top-8 left-10 items-center justify-center bg-red opacity-55 hover:text-orange-800 hover:opacity-100 cursor-pointer">
          <i className="ri-arrow-left-s-fill text-[35px]"></i>
          <p className="text-[18px] translate-y-[-2px] font-medium">Customers</p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default UserManage;
