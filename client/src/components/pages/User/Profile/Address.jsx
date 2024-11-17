import React, { useEffect, useState } from "react";
import picr from "../../../../assets/images/picr.png";
import pic from "../../../../assets/images/image 32.png";
import ind from "../../../../assets/images/indicator.png";
import home from "../../../../assets/images/Adress icons/home.png";
import work from "../../../../assets/images/Adress icons/bag.png";
import person from "../../../../assets/images/Adress icons/person.png";
import other from "../../../../assets/images/Adress icons/other.png";
import { motion } from 'framer-motion';
import { useGetAdressesMutation, useUpdateProfileMutation } from "../../../../services/User/userApi";
import { ToastContainer, toast } from "react-toastify";
import { FaExclamationTriangle,FaCheckCircle } from "react-icons/fa";
import HoverKing from "../../../parts/buttons/HoverKing";
import { useNavigate } from "react-router-dom";
import emptyStateImage from "../../../../assets/images/noCAtegory.png";


const EmptyState = () => (
  <div className="w-full h-[60vh] flex items-center justify-center flex-col text-center gap-5">
    <img className="h-[70%]" src={emptyStateImage} alt="No categories" />
    <div className="flex flex-col gap-2">
      <h1 className="text-[30px] font-bold">No Adress</h1>
      <p className="opacity-45">
        Lets add your address, to continue for buy our healthy product
      </p>
    </div>
  </div>
);


export default function Address({ userData }) {

  // mutation to update user
  const [ getAdresses, { isLoading, error, data }, ] = useGetAdressesMutation();

  const [adressData,setaddressData] = useState()

  const navigate = useNavigate()

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
  useEffect(()=>{
    if(data){
      setaddressData(data)
    }
  },[data])
  useEffect(()=>showToast(error?.data,'error'),[error])


  useEffect(()=>{ (async()=>{ if(userData){ await getAdresses(userData?._id) } })() },[userData])

  return (  userData &&
    <> 
     <ToastContainer title="Error" position="bottom-left" />
      <div className="w-[96%] h-full bg-prof">
      <div className="bg-[#30a5539c] mix-blend-screen absolute w-full h-full"></div>
        <div className="w-full h-full flex flex-col items-center gap-5 backdrop-blur-3xl">
          <span className="w-full h-full px-64 bg-[#ffffff81] relative  overflow-scroll pb-96"> 

            <HoverKing event={()=>navigate('/user/profile/:12/Manageaddress')} styles={'fixed bottom-28 right-64'} Icon={<i className="ri-apps-2-add-line text-[30px] text-[#5fb064]"></i>} >hiheke</HoverKing>

            {/* Head */}
            <h1 className="text-[30px] font-bold my-16 mb-16">Manage Address</h1>

            {   adressData?.length>0 ?
              
            // {/* address container */}
            <div className="w-full flex flex-wrap gap-5">

              {
                adressData?.map((address,index)=>{

                   return <span key={index} >
                <div className="w-[410px] border-2 border-[#a2c4aade] bg-[linear-gradient(45deg,#ffffff70,#ffffff40)] rounded-[45px] flex flex-col p-10 py-4 gap-5">

                    <span className="flex items-center justify-center gap-3">
                    <img className={`w-14 ${address.locationType === 'Work'?'p-1':''}`} src={
                       address.locationType === 'Home'?home:
                       address.locationType === 'Work'?work:
                       address.locationType === 'Person'?person:
                       address.locationType === 'Other'?other:''

                    } alt="" />
                    <p className="text-[22px] font-medium">{address.locationType}</p>
                    <span className="flex-1"></span>
                    <input className="h-5 w-5 bg-transparent rounded-full" type="checkbox" name="" id="" />
                    </span>
                    

                    <span className="text-[18px]">
                        <p className="font-medium">{address.FirstName} {address.LastName}</p>
                        <span className="opacity-55">

                        <p>{address.exactAddress}</p>
                        <p>{address.streetAddress}</p>
                        <p className="font-medium">{address.city.toUpperCase()}, {address.state.toUpperCase()} {address.pincode}</p>
                        </span>
                    </span>

                    <span>
                        <p className="font-medium"><span>+91</span> {address?.phone}</p>
                    </span>

                    <span className="flex">
                        <p className="text-blue-500 font-medium">View on Map</p>
                        <span className="flex-1"></span>
                        <i onClick={()=>navigate('/user/profile/1233/Manageaddress', { state:address } )} className="ri-more-line text-[28px]"></i>
                    </span>

                </div>
                  </span>

                })
              }

            </div> : <EmptyState />

              

            }


            
          </span>
        </div>
      </div>
    </>
  );
}
