import React, { useEffect, useState, useCallback } from "react";

import Homeloc from "../../../../assets/images/homeLocation.png";
import PersonLoc from "../../../../assets/images/personLocation.png";
import OtheLoc from "../../../../assets/images/otherLocation.png";
import WorkLOc from "../../../../assets/images/workLocation.png";

import { useUpsertAddressMutation } from "../../../../services/User/userApi";
import { ToastContainer, toast } from "react-toastify";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import HoverKing from "../../../parts/buttons/HoverKing";
import { useLocation, useNavigate } from "react-router-dom";

// Reusable Input Component
const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col w-full max-w-[450px] gap-1">
    <label className="font-bold opacity-35 ml-2">{label}</label>
    <input
      className="w-full py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Reusable Select Component
const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-1">
    <label className="font-bold opacity-35 ml-2">{label}</label>
    <select
      className="w-full py-3 px-5 rounded-full text-[18px] custom-select"
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default function ManageAddress({ userData }) {
  const [upsertAddress, { isLoading, error, data }] = useUpsertAddressMutation();
  const navigate = useNavigate();
  const location = useLocation()
  // State to hold form data
  const [formData, setForm] = useState({
    user: "",
    FirstName: "",
    LastName: "",
    phone: "",
    city: "",
    streetAddress: "",
    state: "Kerala",
    pincode: "",
    locationType: "Home",
    idDefault: false,
    exactAddress:'',
    location: "",
  });

  useEffect(()=>{
    console.log(location?.state);
    
    if(location?.state){
      setForm(location?.state)
    }
  },[location])


  // Custom Toast Content
  const ToastContent = ({ title, message }) => (
    <div>
      <strong>{title}</strong>
      <div>{message}</div>
    </div>
  );

 const showToast = (message, type = "success") => {
  if (type === "success" && message) {
    toast.success(
      type && <ToastContent title={"SUCCESS"} message={message} />,
      {
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
      }
    );
  } else if (message) {
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

  const validateFormData = (formData) => {
    if (!formData.FirstName.trim()) {
      return "First name is required.";
    }
  
    if (!formData.LastName.trim()) {
      return "Last name is required.";
    }
  
    if (!formData.phone) {
      return "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone.toString())) {
      return "Phone number must be 10 digits.";
    }
  
    if (!formData.city.trim()) {
      return "City is required.";
    }
  
    if (!formData.streetAddress.trim()) {
      return "Street address is required.";
    }
  
    if (!formData.state.trim()) {
      return "State is required.";
    }
  
    if (!formData.pincode) {
      return "Pincode is required.";
    } else if (!/^\d{6}$/.test(formData.pincode.toString())) {
      return "Pincode must be 6 digits.";
    }
  
    if (!formData.locationType.trim()) {
      return "Location type is required.";
    }
  
    if (!formData.exactAddress.trim()) {
      return " Exact address is required.";
    }
  
    return ""; // No errors
  };
  

  // Update Input Handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Handler
  const updateProfileSubmit = async () => {
    const validationError = validateFormData(formData);
    if (validationError) {
      return showToast(validationError, "error");
    }

    const upsertData = { ...formData, user: userData?._id };
    await upsertAddress(upsertData);
  };

  // Handle success and errors
  useEffect(() => {
    if (data) navigate('/user/profile/12/address',{ state: data,replace:true });
  }, [data]);

  useEffect(() => {
    if (error?.data) showToast(error.data, "error");
  }, [error]);

  return (
    userData && (
      <>
        <ToastContainer />
        <div className="w-[96%] h-full bg-prof">
          <div className={`bg-[#d8b94950] duration-500 ${
            formData.locationType === 'Home'?'bg-[#d8b94950]':
            formData.locationType === 'Work'?'bg-[#b1deeb80]':
            formData.locationType === 'Person'?'bg-[#28549f80]':
            formData.locationType === 'Other'?'bg-[#539e3b80]':''
            } mix-blend-screen absolute w-full h-full`}></div>
          <div className="w-full h-full flex flex-col items-center gap-5 backdrop-blur-3xl">
            <span className={`w-full h-full px-64 bg-[#ffffff59] flex`}>
              {/* Image Section */}
              <div className="w-[40%] flex items-center">
                <div className="h-[80%] w-auto bg-[linear-gradient(#ffffff50,#ffffff20)] flex flex-col duration-500 rounded-[50px] px-4 pb-16">
                  <div className="my-8 pl-8 flex gap-5">
                    <p onClick={()=>setForm((prev)=>({...prev,locationType:'Home'}))} className={`${formData.locationType === 'Home'?'text-[#3c6e51] font-bold':'opacity-45'} duration-500 cursor-pointer`}>Home</p>
                    <p onClick={()=>setForm((prev)=>({...prev,locationType:'Work'}))} className={`${formData.locationType === 'Work'?'text-[#3c6e51] font-bold':'opacity-45'} duration-500 cursor-pointer`}>Work</p>
                    <p onClick={()=>setForm((prev)=>({...prev,locationType:'Person'}))} className={`${formData.locationType === 'Person'?'text-[#3c6e51] font-bold':'opacity-45'} duration-500 cursor-pointer`}>Person</p>
                    <p onClick={()=>setForm((prev)=>({...prev,locationType:'Other'}))} className={`${formData.locationType === 'Other'?'text-[#3c6e51] font-bold':'opacity-45'} duration-500 cursor-pointer`}>Other</p>
                  </div>

                  <span className="flex-1"></span>
                  { 
                    <img className="w-full duration-500" src={
                      formData.locationType === 'Home'?Homeloc:
                      formData.locationType === 'Work'?WorkLOc:
                      formData.locationType === 'Person'?PersonLoc:
                      formData.locationType === 'Other'?OtheLoc:''

                    } alt="Location" />
                  }
                  <span className="flex-1"></span>
                </div>
              </div>
                  {/* { formData.locationType === 'Work' &&
                    <img className="w-full" src={WorkLOc} alt="Location" />
                  } 
                  { formData.locationType === 'Person' &&
                    <img className="w-full" src={PersonLoc} alt="Location" />
                  }
                  { formData.locationType === 'Other' &&
                    <img className="w-full" src={OtheLoc} alt="Location" />
                  } */}
                   
                  {/* <img className="w-full" src={OtheLoc} alt="Location" />
                  <img className="w-full" src={WorkLOc} alt="Location" />  */}

              {/* Form Section */}
              <div className="flex-1 h-full w-full flex flex-col items-center gap-5">
                <h1 className="text-[30px] font-bold text-center mt-20 mb-10">Manage Address</h1>
                <div className="flex w-full max-w-[450px] gap-4">
                  <InputField
                    label="First Name"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={inputHandler}
                    placeholder="First Name"
                  />
                  <InputField
                    label="Last Name"
                    name="LastName"
                    value={formData.LastName}
                    onChange={inputHandler}
                    placeholder="Last Name"
                  />
                </div>
                <InputField
                  label="House no., Flat, Building, Company, Apartment"
                  name="exactAddress"
                  value={formData.exactAddress}
                  onChange={inputHandler}
                  placeholder="House no., Building, Flat, etc."
                />
                <InputField
                  label="Street, Area, Sector, Village"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={inputHandler}
                  placeholder="House no., Building, Flat, etc."
                />

                <InputField
                  label="Landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={inputHandler}
                  placeholder="City"
                />
                <div className="flex w-full max-w-[450px] gap-4">
                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={inputHandler}
                  placeholder="City"
                />
                  <InputField
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={inputHandler}
                    type="number"
                    placeholder="Pincode"
                  />
                </div>
                <div className="flex w-full max-w-[450px] gap-4">
                  <SelectField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={inputHandler}
                    options={[
                      { value: "kerala", label: "Kerala" },
                      { value: "karnataka", label: "Karnataka" },
                      // Add other states
                    ]}
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={inputHandler}
                    type="number"
                    placeholder="+91 90XXXXXXXX"
                  />
                </div>
                <HoverKing
                  event={updateProfileSubmit}
                  styles="absolute bottom-24 left-[64%] -translate-x-1/2 rounded-full"
                  Icon={<i className="ri-apps-2-add-line text-[30px] rounded-full"></i>}
                >
                  Submit
                </HoverKing>
              </div>
            </span>
          </div>
        </div>
      </>
    )
  );
}
