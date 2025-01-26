import React from "react";
import Footer from "../../components/Footer";
import Navbar2 from "../../components/Navbar2";
import Navbar from "../../components/Navbar";
import Game from "../../assets/Images/landing page/try out/game.png";
import Knowledge from "../../assets/Images/landing page/try out/knowledge.png";
import GirlImg from "../../assets/Images/landing page/after-login/Girl.png";
import FactImg from "../../assets/Images/landing page/after-login/Fact15.png";
import WordImg from "../../assets/Images/landing page/after-login/word15.png";
import Journey from "./Journey";
import understanding from "../../assets/Images/landing page/course/basics-of-banking.png";
import understandingImg from "../../assets/Images/landing page/course/Basics-of-budget-2.png";
import Card from "../../components/Cards/Card";
import Right from "../../assets/Images/landing page/right.png";

const LandingPage = () => {
  const vidStatus = ["Let's Start", "Let's Resume"];

  const Video = [
    "https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M",
  ];

  // Card content for related topics
  const cardContent = [
    { title: "Basics of Banking", img: understanding },
    { title: "Understanding Money", img: understanding },
    { title: "Basics of Budget", img: understandingImg },
  ];

  return (
    <div>
      <Navbar2 />
      <div className="mx-[4%]">
        {/* Welcome Section */}
        <div className=" text-primary-fp text-6xl font-bold font-title h-40">
          <h1>Welcome Sarthak</h1>
        </div>
        {/* Video Section */}
        <div className="h-96 flex justify-around items-center">
          <div className="bg-bg-color w-auto text-text-g flex font-body">
            <div>
              <img src={GirlImg} alt="" className="w-auto h-64" />
            </div>
            <div className="flex text-3xl pt-8">
              <p>{vidStatus[1]}</p>
            </div>
          </div>
          <div className="w-1/3 h-60">
            <iframe
              className="w-full h-full"
              src={Video[0]}
              title="Course Video Thumbnail"
              allowFullScreen
            />
          </div>
        </div>
        {/* Daily Section */}
        <div className="flex flex-col text-text-g h-auto mb-80 justify-center gap-16">
          <div className="bg-primary-fp h-64 w-3/5 shadow-custom2 rounded-2xl flex col-span-2 items-center justify-around p-4">
            <div className="">
              <img src={FactImg} alt="" className="w-auto h-52" />
            </div>
            <div className="w-2/3 flex flex-col gap-4">
              <div className="font-title text-3xl">
                <h1>Fact of the Day</h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate blanditiis impedit vel dolore similique repudiandae
                  illum saepe ad excepturi quaerat, quidem alias ex incidunt eum
                  dignissimos, aliquam voluptate a nulla. Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Excepturi obcaecati maxime
                  quasi voluptatibus tenetur dolorem saepe pariatur.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-primary-fp h-64 w-3/5 shadow-custom rounded-2xl flex col-span-2 items-center justify-around place-self-end p-4">
            <div className="w-2/3 flex flex-col gap-4 justify-start">
              <div className="font-title text-3xl">
                <h1>Today's Word</h1>
              </div>
              <div>
                <h4 className="font-body font-bold text-xl">Savings</h4>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate blanditiis impedit vel dolore similique repudiandae
                  illum saepe ad excepturi quaerat, quidem alias ex incidunt eum
                  dignissimos, aliquam voluptate a nulla. Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Excepturi obcaecati maxime
                  quasi voluptatibus tenetur dolorem saepe pariatur.
                </p>
              </div>
            </div>
            <div className="">
              <img src={WordImg} alt="" className="w-auto h-52" />
            </div>
          </div>
        </div>
        {/* Journey Section */}
        <Journey />
        {/* Practice Test Section */}
        <div className="text-text-g mb-60">
          <div>
            <h2 className="text-4xl font-body font-bold mb-16">
              Practice Test
            </h2>
          </div>
          <div className="flex justify-center gap-8">
            {cardContent.map((item, index) => (
              <Card key={index} title={item.title} img={item.img} />
            ))}
          </div>
        </div>
        {/* Try Out Section */}
        
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
