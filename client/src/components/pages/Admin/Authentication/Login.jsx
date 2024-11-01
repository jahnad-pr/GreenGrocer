import React, { useState } from "react";

import siginImg from "../../../../assets/images/leftPlate.png";
import placeholder from "../../../../assets/images/placholder_profile.png";
import greenGrocerLogo from "../../../../assets/Logos/main.png";
import fr from "../../../../assets/images/pro.png";

import { IoAdd } from "react-icons/io5"
import { FcGoogle } from "react-icons/fc";
import { useSignInMutation } from "../../../../services/adminApi";

export default function Login() {

  // fromdata inputs
  const [formData,setForm] = useState()
  const [signIn, { isLoading, error, data }] = useSignInMutation();

  // form handler
  const formHandler = (event)=>{
    const {name,value } = event.target
    setForm({...formData,[name]:value})
  }

  // on submit
  const submitHandler = async()=>{

    try {

      const userData = await signIn(formData).unwrap();
      console.log('Signed in successfully:', userData);
      
    } catch (error) {
      console.error('Failed to sign in:', error);
      
    }

  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex">

        {/* first container-- */}
        <div className="bg-gray-100 flex-[2] rounded-l-[555px] order-2">
          <img
            className="h-full absolute object-cover aspect-square scale-110 translate-y-[20px]"
            src={fr}
            alt=""
          />
        </div>

        {/* second container-- */}
        <div className="flex-[3] relative order-1">
          <div className="w-full h-full flex flex-col max-w-[50%] mx-auto items-center gap-5 justify-center">

            {/* app logo */}
            <img className="w-[80%] brightness-0 opacity-60" src={greenGrocerLogo} alt="" />

        

            {/* message */}
            <p className="text-[18px] opacity-35 translate-y-[-10px]">Welcome Back Admin ! Login to continue</p>

            {/* Input Fiealds */}
            <div className="flex flex-col gap-5 w-full max-w-[80%]">
             
              <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
              <i className="ri-at-line text-[28px] opacity-20"></i>
              
              {/* mail input---------------------------------------- */}
                <input
                  placeholder="Mail"
                  className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                  type="text"
                  name="email"
                  onChange={formHandler}
                />
              </div>
              <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
              <i className="ri-key-line text-[28px] opacity-20"></i>

              {/* password input---------------------------------------- */}
                <input
                  placeholder="Password"
                  className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                  type="text"
                  name="password"
                  onChange={formHandler}
                />
              </div>
            
            </div>
            

            {/* Show password */}
            <div className="flex items-center gap-5 max-w-[70%] w-full py-3">
              <div className="w-4 h-4 bg-black rounded-full opacity-25"></div>
              <p className="opacity-45" htmlFor="">Show password</p>
            </div>

            {/* Sign btn */}
            <button onClick={submitHandler} className="bg-[linear-gradient(to_left,#333399,#FF00CC)] py-5 text-white w-[80%] text-[20px] rounded-full font-bold shadow-[6px_6px_10px_#00000080_inset]">
              Signup
            </button>
            
            {/* Sign config */}
            {error && <p style={{ color: 'red' }}>Error: {error.data?.message || error.error}</p>}
            {data && <p>Signed in successfully!</p>}

          </div>
        </div>
      </div>
    </div>
  )
}
