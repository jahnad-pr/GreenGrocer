import React from "react";
import picr from "../../../assets/images/picr.png";
import pic from "../../../assets/images/image 32.png";
import ind from "../../../assets/images/indicator.png";

export default function Main() {
  return (
    <div className="w-[96%] h-full bg-green-100">
      <div className="h-full w-full px-40">
        <div className="h-full w-full bg-gray-400 flex flex-wrap">
          <div className="w-[50%] h-[45%] bg-red-300 flex ic justify-center flex-col px-40">
            <h1 className="text-[45px] font-bold">Shalu Mon</h1>
            <p className="text-[20px] opacity-75">@shalupk</p>
            <p className="pr-40 opacity-45">
              Your profile showcases your bio, interests, and recent activity.
              Keep it updated to let others know more about you and stay
              connected with your journey here!
            </p>
            <p className="text-[20px] text-yellow-600">Golden chef</p>
            <p className="text-[18px] text-blue-500">Manage address</p>
            <img className="h-16 w-16" src={ind} alt="" />
          </div>

          <div className="w-[50%] h-[45%] bg-red-200 p-16  place-items-center">
            <div className="aspect-square h-full  rounded-full grid place-items-center relative">
              <img className="w-full absolute" src={picr} alt="" />
              <img className="w-full" src={pic} alt="" />
            </div>
          </div>

          <div className="w-full h-[55%] bg-red-400 py-10 gap-5 flex items-start justify-center">
            <div className="w-80 bg-green-700 rounded-[65px] order-2">
              <div className="w-full flex justify-center items-center">
                <p className="text-[35px] font-bold">
                  Your
                  <br />
                  Oders
                </p>
                <i className="ri-box-3-line text-[150px] opacity-15"></i>
              </div>
              <p className="px-10 translate-y-[-30px] opacity-35">
                This button allows users to view and manage their past and
                current orders. By clicking, users can track order status, view
                details, and check their order history in one convenient place
              </p>
            </div>

            <div className="w-72 h- bg-green-700 rounded-[65px] order-3 translate-y-[19%]">
              <div className="w-full grid place-items-center  mb-5">
                <p className="text-[35px] font-bold translate-y-[30px]">Coupons</p>
                <i className="ri-ticket-line text-[120px] py-0 opacity-15"></i>
              </div>
              <p className="px-10 translate-y-[-30px] opacity-35">
               manage your available coupons. Keep an eye on them to enjoy discounts and special offers!"
              </p>
            </div>

            <div className="w-80 bg-green-700 rounded-[65px] order-1 translate-y-[8%]">
              <div className="w-full flex justify-center items-center mb-5">
                <i className="ri-user-line text-[120px] opacity-15"></i>
                <p className="text-[32px] font-bold"> Manage <br /> Profile </p>
              </div>
              <p className="px-10 translate-y-[-30px] opacity-35">
              Your profile lets you manage details like your name, contact info, bio, and interests to connect with others easily. You can also view recent activities to keep track of orders and favorites, helping you enjoy a more personalized experience making it easier for others to connect with you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
