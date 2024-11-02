import React, { useEffect, useRef, useState } from "react";
import siginImg from "../../../../assets/images/leftPlate.png";
import placeholder from "../../../../assets/images/placholder_profile.png";
import greenGrocerLogo from "../../../../assets/Logos/main.png";
import { IoAdd } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import {
  useLoginMutation,
  useSignUpMutation,
  useGoogleLogMutation
} from "../../../../services/userApi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { validateFormData } from "./validation/validation";
import { auth, googleProvider } from "../../../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Signup({setSign}) {

  // data form etk query api
  const [signUp, { isLoading: isSignUpLoading, error: signUpError,data:data }] = useSignUpMutation();
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [googleLog, { isLoading: isGoogleLoading, error: googleError }] = useGoogleLogMutation();


  // login with google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const data = result.user
      const dataForm = {
        username: data.displayName,
        email: data.email,
        password: "Google@123",
        confirmPassword: "Google@123",
      }

      await googleLog(dataForm).unwrap();
          setMission(false);
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({})
          setSign(true)

      // You can also store the user info or token in your app state
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Form data state for signup and login
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [upData, setUpData] = useState({ email: "", password: "" });
  const [mission, setMission] = useState(true); // Toggle between signup and login screens
  const [showPassword, setShowPassword] = useState(false);


  const navigator = useNavigate();
  const scroller = useRef();
  const [errors, setErrors] = useState({}); // Error state

  // Handles signup and login functionality
  const signUpUser = async () => {
    const validationErrors = validateFormData(
      mission ? formData : upData,
      mission
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (mission) {
          await signUp(formData).unwrap();
          setMission(false);
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({});
        } else {
          await login(upData).unwrap();
          setSign(true)
        }
      } catch (err) {
        console.error("Failed to sign up:", err);
      }
    }
  };

  // Transition effect on mission state change
  useEffect(() => {
    scroller.current.style.transform = mission
      ? "translateX(0vw)"
      : "translateX(-50vw)";
  }, [mission]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    mission
      ? setFormData((prevData) => ({ ...prevData, [name]: name==='password'?value.trim():value }))
      : setUpData((prevData) => ({ ...prevData, [name]: name==='password'?value.trim():value }));
  };

  return (
    <div ref={scroller} className="w-[150%] h-full flex duration-500">
      <div className="w-full h-full flex duration-300">
        {/* First container */}
        <div className="bg-gray-300 flex-[2] rounded-r-[555px]">
          <img
            className="absolute h-full aspect-square translate-x-[-20%]"
            src={siginImg}
            alt="Background Image"
          />
        </div>

        {/* Second container */}
        <div className="flex-[3] relative">
          <div className="w-full h-full flex flex-col max-w-[50%] mx-auto items-center justify-center duration-700">
            {/* App logo */}
            <img
              className={`w-[18%] absolute bottom-8 right-8 ${
                mission ? "opacity-30" : "opacity-0"
              } brightness-0 opacity-20 duration-300`}
              src={greenGrocerLogo}
              alt="Logo"
            />

            {/* Conditional rendering for logo in login mode */}
            <AnimatePresence>
              {!mission && (
                <motion.div
                  initial={{ scale: 0.0, rotate: 5, height: 0 }}
                  animate={{ scale: 1, rotate: 0, height: "auto" }}
                  exit={{ scale: 0, height: 0, rotate: 0 }}
                >
                  <img className="w-[80%]" src={greenGrocerLogo} alt="" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile placeholder in signup mode */}
            <AnimatePresence>
              {mission && (
                <motion.div
                  initial={{ scale: 0.0, height: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0, height: "auto" }}
                  exit={{ scale: 0, height: 0, rotate: 180 }}
                >
                  <span className="relative">
                    <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center absolute bottom-0 right-0">
                      <IoAdd size={28} />
                    </div>
                    <img
                      className="max-w-[8rem] min-w-[8rem] min-h-[8rem] rounded-full bg-slate-200"
                      src={placeholder}
                      alt="Profile Placeholder"
                    />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Signup message */}
            <p className="text-[18px] opacity-35 my-5 duration-500">
              Signup below to get started
            </p>

            {/* Input Fields */}
            <div className="flex flex-col w-full max-w-[80%] duration-500">
              {/* Username Input */}
              <AnimatePresence>
                {mission && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, height: 0, margin: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      height: "auto",
                      margin: 0,
                    }}
                    exit={{ opacity: 0, scale: 0, height: 0, margin: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full mb-5">
                      <i className="ri-user-line text-[28px] opacity-20"></i>
                      <input
                        name="username"
                        placeholder="User Name"
                        className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Input */}
              <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full duration-700 mb-5">
                <i className="ri-at-line text-[28px] opacity-20"></i>
                <input
                  name="email"
                  placeholder="Email"
                  className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                  type="email"
                  value={mission ? formData.email : upData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password Input */}
              <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full mb-5 relative">
                <i className="ri-key-line text-[28px] opacity-20"></i>
                <input
                  name="password"
                  placeholder="Password"
                  className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                  type={showPassword ? "text" : "password"}
                  value={mission ? formData.password : upData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-9 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <i className="ri-eye-line text-[24px]"></i>
                  ) : (
                    <i className="ri-eye-off-line text-[24px]"></i>
                  )}
                </button>
              </div>

              {/* Confirm Password Input */}
              <AnimatePresence>
                {mission && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, height: 0, margin: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      height: "auto",
                      margin: 0,
                    }}
                    exit={{ opacity: 0, scale: 0, height: 0, margin: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full flex items-center justify-center bg-[linear-gradient(45deg,#f5efef,#f5efef)] py-2 px-5 gap-5 rounded-full">
                      <i className="ri-lock-line text-[28px] opacity-20"></i>
                      <input
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="flex-1 w-full mx-auto py-3 bg-transparent outline-none"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* error message */}
            <AnimatePresence>
              {Object.keys(errors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, height: 0, margin: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    height: "auto",
                    margin: 0,
                  }}
                  exit={{ opacity: 0, scale: 0, height: 0, margin: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className=" mb-4 mx-16 px-10 rounded-3xl mt-8 bg-[linear-gradient(45deg,#ffffff,#f5efef)] border-[2px] border-gray-300 py-5">
                    {Object.values(errors).map(
                      (error, index) =>
                        index === 0 && (
                          <p
                            key={index}
                            className="text-[18px] text-red-500 font-medium"
                          >
                            {error}
                          </p>
                        )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sign Up Button */}
            <button
              onClick={signUpUser}
              className="bg-[linear-gradient(to_left,#f7085a,#bc4a97)] py-5 text-white w-[80%] text-[20px] rounded-full font-bold shadow-[6px_6px_10px_#00000080_inset] duration-700 mt-8"
            >
              Signup
            </button>

            {/* Switch to Login */}
            <p className="text-[18px] text-gray-400 my-10">
              Already a member?{" "}
              <span
                onClick={() => (setMission(!mission), setErrors({}))}
                className="text-blue-900"
              >
                Click to Login
              </span>
            </p>
            <FcGoogle onClick={loginWithGoogle} size={45} />

            {/* Error Message Display */}
            {(signUpError || loginError) && (
              <p style={{ color: "red" }}>
                Error:{" "}
                {signUpError?.data?.message ||
                  signUpError?.error ||
                  loginError?.data?.message ||
                  loginError?.error}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Background Image in the Right Container */}
      <div className="bg-gray-300 flex-[2] rounded-r-[555px]">
        <img
          className="absolute h-full aspect-square translate-x-[20%]"
          src={siginImg}
          alt="Right Background Image"
        />
      </div>
    </div>
  );
}