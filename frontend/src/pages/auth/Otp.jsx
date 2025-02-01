import React from "react";
import logo from "../../assets/Images/Color Logo.png";

const Otp = () => {
  return (
    <div>
      <div className="flex flex-col gap-10 justify-center items-center bg-primary-b h-screen w-full text-text-g">
        <div>
          <img src={logo} alt="" className="w-auto h-24" />
        </div>
        <div className="font-title text-3xl">
          <h2>Register to Fyntrest</h2>
        </div>
        <div className="flex flex-col items-center gap-6 p-4 w-96">
          <div className="flex flex-col w-full">
            <label className="text-md font-medium mb-2">Enter Otp</label>
            <input
              type="text"
              className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
            />
          </div>
          <div className="w-full h-full mt-4">
            <button className="w-full h-12 rounded-md text-md bg-secondary-l">
              Reigster
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>
              Already have an account?
              <span className="text-secondary-lt ml-1 cursor-pointer">
                Login!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
