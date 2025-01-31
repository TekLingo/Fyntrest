import React, { useState } from "react";
import logo from "../../assets/Images/Color Logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-8 justify-center items-center bg-primary-b h-screen w-full text-text-g">
      <div>
        <img src={logo} alt="" className="w-auto h-24" />
      </div>
      <div className="font-title text-3xl">
        <h2>Log in to Fyntrest</h2>
      </div>
      <div className="flex flex-col items-center gap-6 p-4 w-96">
        <div className="flex flex-col w-full">
          <label className="text-md font-medium">Email Address</label>
          <input
            type="email"
            className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
          />
        </div>
        <div className="flex flex-col w-full relative">
          <label className="text-md font-medium">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-md h-12 p-2 text-lg text-text-d bg-secondary-lt pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-text-d"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-primary-fp" /> : <FaEye  className="text-primary-fp" />}
            </button>
          </div>
        </div>
        <div className="w-full h-full mt-4">
          <button className="w-full h-12 rounded-md text-md bg-secondary-l">
            Login
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 ">
          <p className="">Forgot Password?</p>
          <p>
            Don't have an account?
            <a href="" className="text-secondary-lt hover:underline ml-2">
              Register!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
