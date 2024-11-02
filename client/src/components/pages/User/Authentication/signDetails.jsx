import React, { useEffect, useState } from "react";
import leftImg from "../../../../assets/images/homi.jpeg";
import { useGetOTPMutation, useConformOTPMutation, useAddDetailsMutation } from "../../../../services/userApi";
import { useLocation, useNavigate } from "react-router-dom";

const SignDetails = () => {



  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [gender, setGender] = useState("Male");
  const [place, setPlace] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [second, setSecond] = useState(false);

  const [getOTP, { isLoading: sendLoading, error: sendError, data: sendData }] = useGetOTPMutation(); 
  const [ conformOTP, { isLoading: confirmLoading, error: confirmError, data: conformData }, ] = useConformOTPMutation();
  const [ addDetails, { isLoading: updateLoading, error: updateError, data: updateData }, ] = useAddDetailsMutation();

  const location = useLocation()
  const navigator = useNavigate()

  // useEffect(()=> console.log(conformData),[conformData])

useEffect(() => {
  setSecond(30);

  if (sendData) {
    const intervalId = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevSecond - 1;
      });
    }, 1000);

    // Cleanup function to clear interval when component unmounts or sendData changes
    return () => clearInterval(intervalId);
  }
}, [sendData]);


  useEffect(()=>{    
    if(updateData){
      navigator('/user/home')
    }
  },[updateData])


  // update user
  const addUserDetails = async () => {
    const formData = {
      phone: phoneNumber,
      gender: gender,
      place: place,
      uniqueId: location.state.user[0]._id
    };
  
    try {
      await addDetails(formData).unwrap();
    } catch (error) {
      console.error("Error adding details:", error);
    }
  };


  // to get otp
  const getOTPnumber = () => {
    (async () => {
      await getOTP(location.state.user.email).unwrap();
    })();
  };

  // to conform otp
  const confirmOtp = () => {
    (async () => {
      await conformOTP({mail:location.state.user.email,otp}).unwrap();
    })();    

  };

  return (
    <div className="min-h-screen bg-[linear-gradient(#f3f8fb,#d0d6d8)] flex items-center justify-center p-4 py-0 mx-auto">
      {/* Background Images */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <img src={leftImg} alt="Vegetables bowl" className="rounded" />
      </div>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
        <img src={leftImg} alt="Fruits bowl" className="rounded" />
      </div>

      {/* Form Container */}
      <div className="space-y-6 relative bg-[#ffffffee] h-full flex items-center flex-col justify-center px-32">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="w-16 h-16 bg-purple-400 rounded-full mx-auto mb-4 opacity-80 flex items-center justify-center">
            <div className="w-3 h-12 flex flex-col justify-between">
              <div className="w-3 h-3 bg-white rounded-full" />
              <div className="w-3 h-3 bg-white rounded-full" />
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold">Fill Your Details</h1>
          <p className="text-gray-600">and Continue</p>
        </div>

        {/* Form */}
        <form className="space-y-4">


          {/* Phone Input */}
          {
            
          }
          <div className={`${conformData?'opacity-20':'opacity-100'}`}><button
            onClick={()=>!sendLoading&&!(sendData&&second)?!conformData?getOTPnumber():'':''}
            type="button"
            className={`w-full ${sendLoading?"opacity-25":sendData&&second?'opacity-25':'opacity-100'} py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-800 transition-colors`}
          >
            {sendLoading?'sending......':!sendData?'Send OTP And Verify':'Resend OTP'}
          </button></div>

          <span className={`${sendData?'opacity-100':conformData?'opacity-50':"opacity-50"} flex flex-col gap-5`}>

          {/* OTP Input */}
          
          <div className={`${conformData?'opacity-20':'opacity-100'}`}>
          <div className="space-y-2">
            { !conformData &&
            <p className="text-sm text-gray-600">
              {!sendData&!sendLoading?' ':sendLoading?'request sent wait for it..':second?'you can resend the OTP after '+second+' second':'Enter the OTP, check yor mail to the code'}
            </p>
            }
            <div className="flex gap-2">
              <input
                type="text"
                disabled={conformData?true:sendData?false:true}
                value={!conformData?otp:''}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-200 rounded-lg focus:outline-none"
                placeholder="0 X X X X X"
              />
              <button
                onClick={()=>!conformData&&sendData?confirmOtp():''}
                type="button"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Confirm
              </button>
            </div>
            {/* <button type="button" className="text-blue-500 text-sm">
              Resend OTP
            </button> */}
          </div>
          </div>
          </span>

          <span className={`${conformData?'opacity-100':'opacity-20'} flex flex-col gap-5`}>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="tel"
                disabled={!conformData}
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Gender Select */}
          <div className="relative">
            <select
              value={gender}
              disabled={!conformData}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 bg-gray-200 rounded-lg appearance-none focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Place Input */}
          <input
            type="text"
            placeholder="Place"
            disabled={!conformData}
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none"
          />

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={accepted}
              disabled={!conformData}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-4 h-4"
            />
            <p className="text-sm text-gray-600">
              Yes, I accept the{" "}
              <a href="#" className="text-blue-500">
                terms of use
              </a>{" "}
              and the{" "}
              <a href="#" className="text-blue-500">
                Terms & Conditions
              </a>
            </p>
          </div> 


          <p>{ conformData || sendData }..</p>

          {/* Submit Button */}
          <button
            type="button"
            onClick={addUserDetails}
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Continue
          </button>

          </span>
        </form>
      </div>
    </div>
  );
};

export default SignDetails;
