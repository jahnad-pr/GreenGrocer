import React from 'react'
import picr from "../../../../assets/images/picr.png";
import pic from "../../../../assets/images/image 32.png";
import ind from "../../../../assets/images/indicator.png";
import MainChart from '../../../parts/Main/MainChart';
import AngleCircle from '../../../parts/Main/AngleCircleChart';
import LineChart from '../../../parts/Main/LineChart';
import Recents from '../../../parts/Main/Recents';

export default function DashHome() {
  return (
    <>
    <div className='w-[75%] h-full pt-[86px] rounded-tl-3xl'>
        <div className="w-full h-full flex">

        {/* container root */}
        <div className="h-full w-[100%] flex flex-wrap">

          {/* profile deatail and message */}
          <div className="w-[50%] h-[35%]  flex ic justify-center px-40">
           
           <AngleCircle />
           Totle sales and stats
          
          </div>

          {/* profile pic section */}
          <div className="w-[50%] h-[35%] ">
            <div className="aspect-square h-full  rounded-full inline-flex relative gap-10 items-center">
              <img className="h-full object-cover absolute" src={picr} alt="" />
              <img className="h-full" src={pic} alt="" />
              <span className='w-full flex flex-col gap-3 pt-8'>
              <h1 className="text-[45px] font-bold leading-none">Welcome Shalu</h1>
            <p className="text-[15px] opacity-75">this is your world !</p>
            <p className=" opacity-45">
            An admin is a user with special access to manage and control the system, handling tasks like editing or deleting data, and overseeing user activities.
            </p>
                
              </span>
            </div>
          </div>

          {/* chart config container */}
          <div className="w-1/2 h-[55%] pb-20 gap-5 flex">
            <MainChart /> 
          </div>

          {/* other stats */}
          <div className="w-1/2 h-[55%] flex flex-col">

          <div className="w-full h-60  flex items-center">
            <div className="inline-flex ">
            <div className="w-28 h-28 bg-gray-400 rounded-full"></div>
            <div className="w-28 h-28 bg-gray-500 rounded-full relative translate-x-[-50%] translate-y-[50%]"></div>
            <div className="w-36 h-36 bg-gray-300 rounded-full relative translate-x-[-100%] translate-y-[-20%]"></div>
            </div>

            order stats
          </div>

          <div className="flex-1  flex">
            <div className="h-full w-1/2 "></div>
            <div className="h-full w-1/2 ">
            <LineChart />
            </div>
          </div>
          
          </div>


        </div>



      </div>
    </div>
        <Recents />
    </ >
   
  )
}
