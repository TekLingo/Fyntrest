import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import basicImg from "../../assets/Images/landing page/course/basicsOfFinLiteracy.png";
import Breadcrumb from "../../components/Breadcrumb";
import UnlockCard from "../../components/Cards/UnlockCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Card from "../../components/Cards/Card";
import understanding from "../../assets/Images/landing page/course/basics-of-banking.png";
import understandingImg from "../../assets/Images/landing page/course/Basics-of-budget-2.png";

const Money = () => {
  const courseContents = [
    "Understanding Needs and Wants",
    "Spending Choices",
    "Spending Choices",
    "Spending Choices",
  ];

  const cardContent = [
    {
      title: "Basics of Banking",
      img: understanding,
    },
    {
      title: "Understanding Money",
      img: understanding,
    },
    {
      title: "Basics of Budget",
      img: understandingImg,
    },
  ];

  return (
    <div className="">
      <Navbar />
      <div className="mx-28 text-text-g">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            <GoHome className="h-auto w-6" />,
            "Course",
            "Basics of Financial Literacy",
          ]}
        />

        {/* Heading Section */}
        <div className="w-full my-10">
          <div className="flex col-span-2 gap-32 items-center justify-around">
            <div className="">
              <div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
                <h1>Basics of Financial Literacy</h1>
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
              <img src={basicImg} alt="Basics of Financial Literacy" />
            </div>
          </div>
        </div>
        {/* Course content */}
        <div className="py-4">
          <div className="mb-12">
            <h2 className="text-4xl font-body font-bold">
              Glimpse of Course
            </h2>
          </div>
          <div className="flex flex-col gap-6 py-6">
            {courseContents.map((content, index) => (
              <div
                key={index}
                className="flex justify-between w-full bg-primary_p h-20 rounded-2xl items-center font-body text-xl px-8 cursor-pointer"
              >
                <h1>{content}</h1>
                <MdKeyboardArrowRight className="text-3xl" />
              </div>
            ))}
          </div>
          <UnlockCard />
        </div>
        {/* Check Out Section */}
        <div className="mb-16">
          <div className="font-body text-4xl font-bold mb-16">
            <h2>People also Check Out!!</h2>
          </div>
          <div className="flex justify-center gap-8">
            {cardContent.map((item, index) => (
              <div key={index}>
                <Card title={item.title} img={item.img} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Money;
