import React from 'react'
import rpi from '../../../assets/images/rpillu.png'

export default function ResetPassword() {
  return (
    <div className='w-[96%] h-full'>
        <div className="w-full h-full px-40 flex flex-col justify-center items-center gap-5">
          <h1 className="text-[30px] font-bold">Reset Password</h1>
            <img className='w-[400px]' src={rpi} alt="" />
            <input className='w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]' type="text" placeholder='Old Password' />
            <p className='max-w-[410px] w-full text-blue-500 font-medium'>Forget password ?</p>
            <input className='w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]' type="text" placeholder='New Password' />
            <input className='w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]'  type="text" placeholder='Confirm Password' />

            <button className="px-16 py-[10px] bg-[linear-gradient(to_left,#0bc175,#0f45ff)] text-[18px] rounded-full text-white font-medium mt-10 w-full max-w-[450px]">Change Password</button>

        </div>
    </div>
  )
}
