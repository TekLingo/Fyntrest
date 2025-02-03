import React from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { GoMail } from "react-icons/go";

const ContactUsPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Navbar2 />
      <div className="flex justify-around">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-3xl font-title text-secondary-l">Contact Us</h2>
          </div>
          <div className="text-text-g flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <MdOutlineLocationOn className="w-auto h-6" />
              <p>Office location would come here, Pune-411052</p>
            </div>
            <div className="flex gap-4 items-center">
              <MdOutlineLocalPhone className="w-auto h-6" />
              <p>+91 00000 00000 </p>
            </div>
            <div className="flex gap-4 items-center">
              <GoMail className="w-auto h-6" />
              <p>xyz.fyntrest@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl font-title text-secondary-l">Chat with us</h2>
          <div className="flex items-center justify-center font-body">
            <div className="w-full max-w-2xl grid grid-cols-2 gap-4 rounded-2xl shadow-lg text-text-g">
              <div className="col-span-1">
                <label className="text-sm">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none"
                />
              </div>
              <div className="col-span-1">
                <label className="text-text-g text-sm">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-text-g text-sm">Email Address</label>
                <input
                  type="email"
                  className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none"
                />
              </div>
              <div className="col-span-2 flex justify-around">
                <label className="text-text-g text-sm flex items-center">
                  <input type="radio" name="role" className="mr-2" /> Student
                </label>
                <label className="text-text-g text-sm flex items-center">
                  <input type="radio" name="role" className="mr-2" /> Parent
                </label>
                <label className="text-text-g text-sm flex items-center">
                  <input type="radio" name="role" className="mr-2" /> Teacher
                </label>
                <label className="text-text-g text-sm flex items-center">
                  <input type="radio" name="role" className="mr-2" /> School
                </label>
              </div>
              <div className="col-span-2">
                <label className="text-text-g text-sm">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-text-g text-sm">Message</label>
                <textarea
                  placeholder="Leave a message"
                  className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none h-24"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
