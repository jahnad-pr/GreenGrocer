import React from "react";

import siginImg from "../../../assets/images/leftPlate.png";
import placeholder from "../../../assets/images/placholder_profile.png";
import greenGrocerLogo from "../../../assets/Logos/main.png";


import { IoAdd } from "react-icons/io5"
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex">

        {/* first container-- */}
        <div className="bg-gray-300 flex-[2] rounded-r-[555px]">
          <img
            className="absolute h-full aspect-square translate-x-[-20%]"
            src={siginImg}
            alt=""
          />
        </div>

        {/* second container-- */}
        <div className="flex-[3] relative">
          <div className="w-full h-full flex flex-col max-w-[50%] mx-auto items-center gap-5 justify-center">

            {/* app logo */}
            <img className="w-[18%] absolute bottom-8 right-8 brightness-0 opacity-20" src={greenGrocerLogo} alt="" />

            {/* placeholder profile */}
            <div className="relative">
              <div className="w-8 h-8 bg-orange-300 rounded-full items-center justify-center flex absolute bottom-0 right-0">
                <IoAdd size={28} />
              </div>
              <img
                className="max-w-[8rem] min-w-[8rem] min-h-[8rem] rounded-full bg-slate-200"
                src={"placeholder"}
                alt=""
              />
            </div>

            {/* message */}
            <p className="text-[18px] opacity-35">Signup below to get started</p>

            {/* Input Fiealds */}
            <div className="flex flex-col gap-5 w-full max-w-[80%]">
              <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
              <i className="ri-user-line text-[28px] opacity-20"></i>
                <input
                  placeholder="user name"
                  className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                  type="text"
                />
              </div>
              <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
              <i className="ri-at-line text-[28px] opacity-20"></i>
              
                <input
                  placeholder="Mail"
                  className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                  type="text"
                />
              </div>
              <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
              <i className="ri-key-line text-[28px] opacity-20"></i>

                <input
                  placeholder="Password"
                  className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                  type="text"
                />
              </div>
              <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
              <i className="ri-lock-line text-[28px] opacity-20"></i>
              
                <input
                  placeholder="Confirm Password"
                  className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                  type="text"
                />
              </div>
            </div>
            

            {/* Show password */}
            <div className="flex items-center gap-5 max-w-[70%] w-full py-5">
              <div className="w-4 h-4 bg-black rounded-full opacity-25"></div>
              <p className="opacity-45" htmlFor="">Show password</p>
            </div>

            {/* Sign btn */}
            <button className="bg-[linear-gradient(to_left,#f7085a,#bc4a97)] py-5 text-white w-[80%] text-[20px] rounded-full font-bold shadow-[6px_6px_10px_#00000080_inset]">
              Signup
            </button>
            
            {/* Sign config */}
            <p className="text-[18px] text-gray-400"> Already a member ? <span className="text-blue-900">Click to Login</span> </p>
            <FcGoogle size={45} />

          </div>
        </div>
      </div>
    </div>
  );
}
