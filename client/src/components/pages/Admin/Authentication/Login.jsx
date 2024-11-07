import React, { useState } from "react";
import signinImg from "../../../../assets/images/leftPlate.png";
import placeholderProfile from "../../../../assets/images/placholder_profile.png";
import grocerLogo from "../../../../assets/Logos/main.png";
import profileImage from "../../../../assets/images/pro.png";

import { IoAdd } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useSignInMutation } from "../../../../services/adminApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Initialize hooks
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [signIn, { error, data }] = useSignInMutation();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const userData = await signIn(form).unwrap();
      if (userData) {
        navigate('/admin/home');
      }
    } catch (err) {
      console.error('Failed to sign in:', err);
    }
  };

  return (

    <div className="w-full h-full">
      <div className="flex w-full h-full">

        {/* Left panel with background image */}
        <div className="bg-gray-100 flex-[2] rounded-l-[555px] order-2 relative">
          <img
            className="h-full absolute object-cover aspect-square scale-110 translate-y-[20px]"
            src={profileImage}
            alt="Profile Background"
          />
        </div>

        {/* Right panel with form */}
        <div className="flex-[3] relative order-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-5 w-full max-w-[50%] mx-auto">

            {/* App logo */}
            <img className="w-[80%] brightness-0 opacity-60" src={grocerLogo} alt="App Logo" />

            {/* Welcome message */}
            <p className="text-[18px] opacity-35 translate-y-[-10px]">Welcome Back, Admin! Login to continue</p>

            {/* Input Fields */}
            <div className="flex flex-col gap-5 w-full max-w-[80%]">
              
              {/* Email input */}
              <div className="flex items-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
                <i className="ri-at-line text-[28px] opacity-20"></i>
                <input
                  placeholder="Email"
                  className="flex-1 bg-transparent outline-none py-3"
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Password input */}
              <div className="flex items-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
                <i className="ri-key-line text-[28px] opacity-20"></i>
                <input
                  placeholder="Password"
                  className="flex-1 bg-transparent outline-none py-3"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>

            </div>

            {/* Show Password toggle (placeholder for functionality) */}
            <div className="flex items-center gap-5 max-w-[70%] w-full py-3">
              <div className="w-4 h-4 bg-black rounded-full opacity-25"></div>
              <p className="opacity-45">Show password</p>
            </div>

            {/* Sign-in button */}
            <button
              onClick={handleSubmit}
              className="bg-[linear-gradient(to_left,#333399,#FF00CC)] py-5 text-white w-[80%] text-[20px] rounded-full font-bold shadow-[6px_6px_10px_#00000080_inset]"
            >
              Sign In
            </button>

            {/* Error and success messages */}
            {error && <p className="text-red-500">Error: {error.data?.message || error.error}</p>}
            {data && <p>Signed in successfully!</p>}

          </div>
        </div>
      </div>
    </div>
    
  );
}
