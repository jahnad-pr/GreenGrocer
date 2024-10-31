import React from "react";
import picr from "../../../../assets/images/picr.png";
import pic from "../../../../assets/images/image 32.png";
import ind from "../../../../assets/images/indicator.png";

export default function Profiler() {
  return (
    <>
      <div className="w-[96%] h-full">
        <div className="w-full h-full px-64 flex flex-col items-center gap-5">
          {/* Head */}
          <h1 className="text-[30px] font-bold my-16 mb-5">Profile</h1>
          <div className="flex w-[80%] items-center justify-center">
            {/* profile deatail and message */}
            <div className=" h-full] flex ic justify-center flex-col px-20">
              <h1 className="text-[45px] font-bold">Shalu Mon</h1>
              <p className="text-[20px] opacity-45 translate-y-[-15px]">@shalupk</p>

              {/* mnaage address button */}
              <p className="text-[18px] text-blue-500">Manage address</p>
              <p className="text-[18px] text-red-500">Reset password</p>
              <img className="h-16 w-16 opacity-35" src={ind} alt="" />
            </div>
            {/* profile pic section */}
            <div className=" h-full  flex">
              <div className="aspect-square h-full rounded-full flex items-center justify-start relative">
                <img className="w-full left-0 absolute" src={picr} alt="" />
                <img className="w-full" src={pic} alt="" />
              </div>
            </div>
          </div>

          {/* editer */}
          <div className="flex-1 h-10 w-full flex flex-col items-center  gap-5">
            {/* Name */}
            <div className="flex-col flex gap-1">
              <label
                className="font-bold opacity-35 w-full max-w-[410px] ml-2"
                htmlFor=""
              >
                User Name
              </label>
              <input
                className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px] "
                type="text"
                placeholder="shalu"
              />
            </div>
            {/* tag name and phone */}
            <div className="flex gap-8">
              <span className="flex flex-col gap-1">
                <label
                  className="font-bold opacity-35 w-full max-w-[200px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Tag Name
                </label>
                <input
                  className="w-full max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="@shalu"
                />
              </span>
              {/* phone */}
              <span className="flex flex-col flex-1 gap-1">
                <label
                  className="font-bold opacity-35 w-full max-w-[420px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Phone
                </label>

                <input
                  className="w-full max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="+918978XXXXXX"
                />
              </span>
            </div>
            {/* email */}
            <div className="flex-col flex gap-1">
              <label
                className="font-bold opacity-35 w-full max-w-[420px] ml-2"
                htmlFor=""
              >
                Email
              </label>
              <input
                className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
                type="text"
                placeholder="shalu@gmail.com"
              />
            </div>

            {/* place and gender*/}
            <div className="flex gap-8">
              <span className="flex flex-col gap-1">
                <label
                  className="font-bold opacity-35 w-full max-w-[200px] ml-2"
                  htmlFor=""
                >
                  &nbsp;&nbsp;Place
                </label>
                <input
                  className="w-full max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
                  type="text"
                  placeholder="Techno"
                />
              </span>
              {/* Gender */}
              <span className="flex flex-col flex-1 gap-1">
                <label
                  className="font-bold opacity-35 w-full max-w-[420px] ml-2"
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

            <button className="px-0 py-[15px] bg-[linear-gradient(to_left,#be2727,#A51B87)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
