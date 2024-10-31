import React from 'react'
import coin from "../../../../../assets/images/con.png";
import past from '../../../../../assets/images/ane.gif'


export default function OrderSuccess() {



  return (
    <div className='w-[96%] h-ful'>
        <div className="w-full h-full px-80 pl-0 justify-center flex items-center gap-5">
            <img className='bg-blend-darken aspect-square w-[45%] object-cover' src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif" alt="" />
          <span className=' flex flex-col items-center gap-8'>
            <span className='leading-[32px]'>
            <p className='text-[40px] font-bold text-[#00d34f]'>Order Success</p>
            <p className='text-[20px] opacity-35 text-center'>Your Order is Being Prepared</p>

            </span>
            <p className='text-[30px] font-bold'>Order id  -   <span className='opacity-45'>1768567DF</span></p>
            <div className="flex items-center gap-5 relative">
              <p className='text-[200px] absolute opacity-[3%] right-0'>+</p>
              <img className='w-28' src={coin} alt="" />
              <p className='text-[24px] text-gray-400'><span className='font-bold text-yellow-700'>8</span> Coin added</p>
            </div>
            <div className="flex gap-3 mt-10">
            <button className='text-[18px] px-6 py-2 bg-[linear-gradient(to_left,#179931,#00d34f)] rounded-xl text-white'>View Oders</button>
            <button className='text-[18px] font-medium bg-[linear-gradient(to_left,#179931,#18b437)] p-[2px] rounded-xl'>
              <p className='text-[#179931] bg-white w-full h-full px-5 text-center flex items-center rounded-[10px] font-bold'>View Wallet</p></button>

            </div>

          </span>

            <img className='w-50%' src={'past'} alt="" />
        </div>
    </div>
  )
}
