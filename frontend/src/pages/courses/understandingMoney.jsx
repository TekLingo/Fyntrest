import React from "react";
import Navbar from "../../components/Navbar";
import { GoHome } from "react-icons/go";
import Footer from "../../components/Footer";
import { FaChevronRight } from "react-icons/fa6";
import basicImg from "../../assets/Images/landing page/course/basicsOfFinLiteracy.png";

const Money = () => {
  return (
    <div className="">
      <Navbar />
      <div className="p-4 px-16 text-text-g">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-row items-center justify-start gap-2">
          <div>
            <GoHome color="white" className="w-6 h-auto" />
          </div>
          <div className="">
            {/* <FaChevronRight color="white" /> */}
            <p>{">"}</p>
          </div>
          <div className="">
            <p>Course</p>
          </div>
          <div className="">
            {/* <FaChevronRight color="white" /> */}
            <p>{">"}</p>
          </div>
          <div className="font-bold">
            <p>Basics of Financial Litracy</p>
          </div>
        </div>
        {/* Heading Section */}
        <div className="w-full py-10">
          <div className="flex col-span-2 items-center justify-between">
            <div className="max-w-[45%]">
              <div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
                <h1>Basics of Financial Litracy</h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Totam, nesciunt architecto recusandae nemo mollitia quasi a
                  modi ipsum dolor molestias quas eos quidem reprehenderit,
                  porro tenetur harum doloremque consectetur beatae.
                </p>
              </div>
              <div className="py-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Totam, nesciunt architecto recusandae nemo mollitia quasi a
                  modi ipsum dolor molestias quas eos quidem reprehenderit,
                  porro tenetur harum doloremque consectetur beatae.
                </p>
              </div>
            </div>
            <div className="">
              <img src={basicImg} className="w-80 h-auto" alt="/" />
            </div>
          </div>
        </div>
        {/* Course content */}
        <div>
          <div className="py-4">
            <h2 className="text-4xl font-body font-bold">Glimpse of Course</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-primary_p h-16 w-full p-4 flex items-center text-lg border">
              <p>Understanding Needs and Wants</p>
            </div>
            <div className="bg-primary_p h-16 w-full p-4 flex items-center text-lg border">
              <p>Understanding Needs and Wants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Money;
