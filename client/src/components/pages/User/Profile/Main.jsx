import React from "react";
import picr from "../../../../assets/images/picr.png";
import pic from "../../../../assets/images/image 32.png";
import ind from "../../../../assets/images/indicator.png";
import gg from "../../../../assets/Logos/gg.png";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { ToastContainer } from "react-toastify";

export default function Main({ userData}) {

  const navigator = useNavigate()

  return (
      <> 
    <div className="w-[96%] duration-500 h-full bg-[#f2f2f2]">
      <div className="h-full duration-500 w-full flex">
          
         {/* container root */}
        <div className="h-full duration-500 px-20 bg-[#ffffff89] overflow-scroll">
        { userData && 
        <><span className="flex py-20 pt-28">
            
            <div className="w-[50%] h-[45%] ic justify-center flex-col px-40 ">
              <h1  className="text-[45px] font-bold">{userData?.username}</h1>
              <p className="text-[20px] opacity-75">
                {/* @{userData?.username}123HK */}
              </p>
              <p className="pr- opacity-45">
                Your profile showcases your bio, interests, and recent activity.
                Keep it updated to let others know more about you and stay
                connected with your journey here!
              </p>
              <p className="text-[20px] text-yellow-600">Golden chef</p>
              {/* mnaage address button */}
              <p onClick={()=>navigator('/user/profile/:12/address')} className="text-[18px] text-blue-500 cursor-pointer">Manage address</p>
              <img className="h-16 w-16" src={ind} alt="" />
            </div>

            {/* profile pic section */}
            <motion.div layoutId={'pic'}  className="w-[50%] max-h-[20%] flex pl-2 items-end justify-start pb-14">
              <div className="aspect-square h-full rounded-full flex items-center relative">
                <img className="w-full absolute " src={picr} alt="" />
                <img className="w-full" src={pic} alt="" />
              </div>
            </motion.div>
          </span>

          {/* bottom config container */}
          <div className="w-full  py-0 gap-5 flex items-start justify-center">
            {/* user order list btn */}
            <div onClick={()=>navigator('/user/OrderList')} className="w-80 bg-[linear-gradient(45deg,#00000020,#00000010)] hover:translate-y-10 duration-500 rounded-[65px] order-2">
              <div className="w-full flex justify-center items-center">
                <p className="text-[35px] font-bold ">
                  Your
                  <br />
                  Oders
                </p>
                <i className="ri-box-3-line text-[150px] opacity-15 text-[#284936]"></i>
              </div>
              <p className="px-10 translate-y-[-30px] opacity-35">
                This button allows users to view and manage their past and
                current orders. By clicking, users can track order status, view
                details, and check their order history in one convenient place
              </p>
            </div>
            
            {/* user coupon list btn */}
            <div onClick={()=>navigator('/user/Coupons')} className="w-72 h- bg-[linear-gradient(#00000015,#00000005)] hover:-translate-y-10 duration-500 rounded-[65px] order-3 translate-y-[19%]">
              <div className="w-full grid place-items-center  mb-5">
                <p className="text-[35px] font-bold translate-y-[30px]">
                  Coupons
                </p>
                <i className="ri-ticket-line text-[120px] py-0 opacity-45 text-[#284936]"></i>
              </div>
              <p className="px-10 translate-y-[-30px] opacity-35">
                manage your available coupons. Keep an eye on them to enjoy
                discounts and special offers!"
              </p>
            </div>

            {/* manage profile btn */}
            <div onClick={()=>navigator('/user/profile/:12/manage')}  className="w-80 bg-[linear-gradient(45deg,#284936,#53aa58)] hover:-translate-y-10 duration-500 rounded-[65px] order-1 translate-y-[8%] text-white">
              <div className="w-full flex justify-center items-center mb-5">
                <i className="ri-user-line text-[120px] opacity-45"></i>
                <p className="text-[32px] font-bold opacity-70">
                  {" "}
                  Manage <br /> Profile{" "}
                </p>
              </div>
              <p className="px-10 translate-y-[-30px] opacity-55">
                Your profile allows you to manage details like name, contact
                info, bio, and interests, making connections simpler. You can
                also track recent activities, orders, and favorites for a more
                personalized and streamlined experience.
              </p>
            </div>
          </div>
        </>
          }
        </div>

        {/* naviagation container */}
        <div className="w-[08%] hover:w-[25%] duration-500 h-full grooup bg-gray-300 font-['lufga']">
          <div className="w-full h-full p-10 flex flex-col gap-5">
          <img className="w-16 object-cover mb-8" src={gg} alt="" />

          {/* profile */}
          <span className="group">
          <i className="ri-user-line text-[30px]"></i><p className="inline ml-3 text-[20px]">Profile</p>
          <span className="leading-none flex flex-col gap-3 mt-3 border-l-2 border-gray-500 pl-5 ml-3 h-0 w-0 overflow-hidden group-hover:h-40 group-hover:w-auto duration-500" >
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">Manage profile</h1>
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">Your orders</h1>
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">Coupons</h1>
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">MAnage address</h1>
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">Reset password</h1>
          </span>
          </span>

          {/* Settings */}
          <span className="duration-500 group">
          <i className="ri-tools-line text-[30px]"></i><p className="inline ml-3 text-[20px]">Configaration</p>
          <span className="leading-none flex flex-col gap-3 mt-5 border-l-2 border-gray-500 pl-5 h-0 w-0 overflow-hidden group-hover:h-32 group-hover:w-auto duration-500" >
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">Settings</h1>
            <h1 onClick={()=>navigator('/user/map')} className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">Manage Location</h1>
      
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">Appearance</h1>
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#ff4141] hover:opacity-100 cursor-pointer">Logout</h1>
          </span>
          </span>

          {/*  about app */}
          <span className="duration-500 group">
          <i className="ri-info-i text-[30px]"></i><p className="inline ml-3 text-[20px]">Application</p>
          <span className="leading-none flex flex-col gap-3 mt-5 border-l-2 border-gray-500 pl-5 h-0 w-0 overflow-hidden group-hover:h-24 group-hover:w-auto duration-500" >
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">Contact</h1>
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">About site</h1>
            <h1 className="text-[20px] font-medium leading-none opacity-55 hover:text-[#284936] hover:opacity-100 cursor-pointer">About the farms</h1>
          </span>
          </span>

          </div>
        </div>

      </div>


    </div>
    </>
  );
}
