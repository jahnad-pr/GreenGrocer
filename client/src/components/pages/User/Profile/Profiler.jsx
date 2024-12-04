import React, { useEffect, useState } from "react";
import picr from "../../../../assets/images/picr.png";
import pic from "../../../../assets/images/image 32.png";
import ind from "../../../../assets/images/indicator.png";
import { motion } from 'framer-motion';
import { useUpdateProfileMutation } from "../../../../services/User/userApi";
import { Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle,FaCheckCircle,FaSave } from "react-icons/fa";
import HoverKing from "../../../parts/buttons/HoverKing";
import { showToast } from "../../../parts/Toast/Tostify";

export default function Profiler({ userData }) {

  // mutation to update user
  const [ updateProfile, { isLoading, error, data }, ] = useUpdateProfileMutation();

  const navigator = useNavigate()

  // Custom content component for the toast
const ToastContent = ({ title, message }) => 
  ( 
  <div>
    <strong>{title}</strong>
    <div>{message}</div>
  </div>
);

  

  // to show the error and success
  useEffect(()=>{
    if(data){
      showToast(data,'success' ) 
       navigator('/user/profile/12') 

    }
  },[data])
  useEffect(()=>showToast(error?.data,'error'),[error])

  // the states
  const [formData, setForm] = useState({ username: "", phone: "", email: "", place: "", gender: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  // adding user data into a state when it update
  useEffect(() => {
    if (userData) setForm(userData);
  }, [userData]);

  // handle inputs
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  // update data
  const updateProfileSumbmit = async()=>{
    await updateProfile(formData)
    setIsEditMode(false); // Disable edit mode after update
  }

  return (  userData &&
    <> 
      <div className="w-[96%] h-full">
        <div className="w-full h-full flex flex-col items-center gap-5">
          <span className="w-full h-full px-64 ">
            {/* Head */}
            <div className="flex justify-between items-center my-16 mb-5">
              <h1 className="text-[30px] font-bold">Profile</h1>
              {!isEditMode && (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="px-6 py-2 bg-[linear-gradient(45deg,#3c6e51,#53aa58)] text-white rounded-full"
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="flex w-[80%] items-center justify-center mx-auto ml-60 mb-3">
              {/* profile deatail and message */}
              <div className=" h-[full] flex justify-center flex-col px-20"
              
              >
                <h1 className="text-[45px] font-bold">{userData?.username}</h1>
                <p className="text-[20px] opacity-45 translate-y-[-15px]">
                  @{formData?.username}123HK
                </p>

                {/* mnaage address button */}
                <p onClick={()=>navigator('/user/profile/:12/address')} className="text-[18px] text-blue-500">Manage address</p>
                <Link to={'/user/profile/:12/resetPassword'} ><p className="text-[18px] text-red-500">Reset password</p></Link>
                <img className="h-16 w-16 opacity-35" src={ind} alt="" />
              </div>
              {/* profile pic section */}
              <motion.div layoutId={'pic'}  className="w-[50%] max-h-[20%] flex pl-2 items-end justify-start pb-14">
              <div className="aspect-square h-full rounded-full flex items-center relative">
                <img className="w-full absolute " src={picr} alt="" />
                <img className="w-full" src={pic} alt="" />
              </div>
            </motion.div>
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
                  className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef50,#f5efef50)] rounded-full text-[18px] "
                  type="text"
                  placeholder="shalu"
                  name="username"
                  onChange={inputHandler}
                  value={formData?.username}
                  disabled={!isEditMode}
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
                    className="w-full max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef50,#f5efef50)] rounded-full text-[18px]"
                    type="text"
                    name=""
                    onChange={inputHandler}
                    placeholder="@shalu"
                    disabled={!isEditMode}
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
                    className="w-full max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef50,#f5efef50)] rounded-full text-[18px]"
                    value={formData?.phone}
                    name="phone"
                    onChange={inputHandler}
                    type="text"
                    placeholder="+918978XXXXXX"
                    disabled={!isEditMode}
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
                  className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef50,#f5efef50)] rounded-full text-[18px]"
                  value={formData?.email.replace(/\.gmail$/, "")}
                  type="text"
                  name="email"
                  onChange={inputHandler}
                  placeholder="shalu@gmail.com"
                  disabled={!isEditMode}
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
                    className="w-full max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef50,#f5efef50)] rounded-full text-[18px]"
                    type="text"
                    onChange={inputHandler}
                    name="place"
                    value={formData?.place}
                    placeholder="Techno"
                    disabled={!isEditMode}
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
                    value={formData?.gender}
                    className="w-52 py-3 px-5 rounded-full text-[18px] custom-select"
                    name="gender"
                    onChange={inputHandler}
                    disabled={!isEditMode}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select> 
                </span>
              </div>

              {isEditMode && (
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setIsEditMode(false)} 
                    className="px-5 py-[15px] bg-gray-400 text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[140px]"
                  >
                    Cancel
                  </button>
                  <HoverKing
                    event={updateProfileSumbmit}
                    Icon={<FaSave className="text-[20px]" />}
                    styles="w-[140px] rounded-full mt-5 absolute"
                  >
                    Save
                  </HoverKing>
                </div>
              )}
            </div>
          </span>
        </div>
      </div>
    </>
  );
}
