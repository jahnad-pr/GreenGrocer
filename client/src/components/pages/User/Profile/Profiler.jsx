import React, { useEffect, useState } from "react";
import picr from "../../../../assets/images/picr.png";
import pic from "../../../../assets/images/image 32.png";
import ind from "../../../../assets/images/indicator.png";
import { motion } from 'framer-motion';
import { useUpdateProfileMutation } from "../../../../services/User/userApi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle,FaCheckCircle } from "react-icons/fa";

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

    
// Show toast notification function
const showToast = ( message, type = "success") => {
  if (type === "success"&&message) {
    toast.success( type&& <ToastContent title={"SUCESSS"} message={message} />, {
      icon: <FaCheckCircle className="text-[20px]" />,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast-success",
      bodyClassName: "custom-toast-body-success",
      progressClassName: "custom-progress-bar-success",
    });
  } else if(message){
    toast.error(<ToastContent title={"ERROR"} message={message} />, {
      icon: <FaExclamationTriangle className="text-[20px]" />,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast",
      bodyClassName: "custom-toast-body",
      progressClassName: "custom-progress-bar",
    });
  }
};

  // to show the error and success
  useEffect(()=>showToast(data,'success' ),[data])
  useEffect(()=>showToast(error?.data,'error'),[error])

  // the states
  const [formData, setForm] = useState({ username: "", phone: "", email: "", place: "", gender: "" });

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
  }

  return (  userData &&
    <> 
     <ToastContainer title="Error" position="bottom-left" />
      <div className="w-[96%] h-full bg-prof">
        <div className="w-full h-full flex flex-col items-center gap-5 backdrop-blur-3xl">
          <span className="w-full h-full px-64 bg-[#ffffff59]">
            {/* Head */}
            <h1 className="text-[30px] font-bold my-16 mb-5">Profile</h1>
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
                  className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px] "
                  type="text"
                  placeholder="shalu"
                  name="username"
                  onChange={inputHandler}
                  value={formData?.username}
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
                    name=""
                    onChange={inputHandler}
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
                    value={formData?.phone}
                    name="phone"
                    onChange={inputHandler}
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
                  value={formData?.email.replace(/\.gmail$/, "")}
                  type="text"
                  name="email"
                  onChange={inputHandler}
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
                    onChange={inputHandler}
                    name="place"
                    value={formData?.place}
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
                    value={formData?.gender}
                    className="w-52 py-3 px-5 rounded-full text-[18px] custom-select"
                    name="gender"
                    onChange={inputHandler}
                    id=""
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select> 
                </span>
              </div>

              <button onClick={()=>updateProfileSumbmit()} className="px-0 py-[15px] bg-[linear-gradient(45deg,#3c6e51,#53aa58)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]">
                Update profile
              </button>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}
