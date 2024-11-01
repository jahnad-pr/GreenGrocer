import React from 'react'
import { Bell } from 'lucide-react';
import greenGrocerLogo from "../../../assets/Logos/main.png";
import pic from "../../../assets/images/image 32.png";

export default function Header() {
  return (
    <>
    <header className="w-full bg-white px-6 py-3 absolute z-10">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img className='h-10 brightness-0 opacity-75' src={greenGrocerLogo} alt="" />
        </div>

        {/* Right Side Section */}
        <div className="flex items-center space-x-6">


          {/* Notification Badge */}
          <div className="relative flex items-center gap-2 bg-[linear-gradient(#FF409A,#C438EF)] px-4 pr-4 py-2 rounded-full text-white shadow-[0px_1px_20px] shadow-[#BA1358]">
            <i className="ri-notification-4-fill text-[18px]"></i>
            <div className="t text-[16px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
              15
            </div>
          </div>

        {/* settings icon */}
        <i className="ri-settings-line text-[28px] opacity-55 px-5"></i>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200"></div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <span className="text-[218x] font-medium text-gray-700">
              Shalu Admin
            </span>
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden">
                {/* Placeholder for profile image */}
                <img src={pic} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}
