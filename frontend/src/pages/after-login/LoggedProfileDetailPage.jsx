import React from "react";
import { LuArrowLeft } from "react-icons/lu";
import ProfileImg from "../../assets/Images/profilePage.png";
import { HiOutlinePencil } from "react-icons/hi2";

const LoggedProfileDetailPage = () => {
  return (
    <div className="text-text-g flex-col gap-2 flex font-body">
      {/* makeshift navbar */}
      <div className=" h-16 px-10 flex justify-between items-end">
        <LuArrowLeft className="w-auto h-8 cursor-pointer" />
        <div>
          <p className="text-secondary-dt text-xl cursor-pointer">Save</p>
        </div>
      </div>
      {/* Info section */}
      <div className="flex items-center justify-center ">
        {/* Image section */}
        <div className=" flex items-center justify-center">
          <img
            src={ProfileImg}
            alt=""
            className="rounded-full flex self-end w-40 h-auto"
          />
          <div className="h-12 w-12 flex justify-center items-center cursor-pointer text-secondary-d self-end hover:bg-secondary-d hover:text-text-g rounded-full">
            <HiOutlinePencil className="w-auto h-8 " />
          </div>
        </div>
      </div>
      {/* Edit section */}
      <div className="">
        <div className="flex justify-center">
          <div className="w-full grid grid-cols-2 gap-6 p-8 ">
            <div className="col-span-1">
              <label className="text-text-g text-sm">First Name</label>
              <input
                type="text"
                className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
              />
            </div>
            <div className="col-span-1">
              <label className="text-text-g text-sm">Last Name</label>
              <input
                type="text"
                className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
              />
            </div>
            <div className="col-span-1">
              <label className="text-text-g text-sm">Gender</label>
              <select className="w-full p-2 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none">
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="text-text-g text-sm">Email Id</label>
              <input
                type="email"
                className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="text-text-g text-sm">School</label>
              <input
                type="text"
                className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
              />
            </div>
            <div className="col-span-1">
              <label className="text-text-g text-sm">School Code</label>
              <input
                type="text"
                className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
              />
            </div>
            <div className="col-span-1">
              <label className="text-text-g text-sm">Grade</label>
              <input
                type="text"
                className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedProfileDetailPage;
