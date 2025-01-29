import React from "react";
import Footer from "../../components/Footer";
import Navbar2 from "../../components/Navbar2";
import Game from "../../assets/Images/landing page/try out/game.png";
import Knowledge from "../../assets/Images/landing page/try out/knowledge.png";
import FactImg from "../../assets/Images/landing page/after-login/Fact15.png";
import WordImg from "../../assets/Images/landing page/after-login/word15.png";
import Journey from "../../components/Cards/Journey";
import Right from "../../assets/Images/landing page/right.png";
import Quiz from "../../assets/Images/landing page/try out/quiz.png";
import ContinueCard from "../../components/Cards/ContinueCard";
import PracticeTest from "../../components/Cards/PracticeTest";

const LandingPage = () => {
  // Card content for related topics
  

  return (
    <div>
      <Navbar2 />
      <div className="mx-[4%]">
        {/* Welcome Section */}
        <ContinueCard />
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
        <PracticeTest />
        {/* Try Out Section */}
        <div className="w-full text-text-g py-20">
          {/* Section Title */}
          <h1 className="font-body text-4xl text-start font-bold mb-20">
            TryOut
          </h1>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 w-4/5 mx-auto items-stretch">
            {/* Left Column */}
            <div className="flex flex-col justify-between gap-8">
              {/* Knowledge Button */}
              <button className="flex items-center justify-between bg-gradient-to-r from-secondary-lt to-secondary-dt rounded-2xl p-6 shadow-lg h-48 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-l">
                <p className="text-text-d font-normal text-2xl font-body w-40 text-start">
                  Test your knowledge
                </p>
                <img
                  src={Knowledge}
                  className="w-60 h-auto"
                  alt="Knowledge Icon"
                />
                <img src={Right} className="w-8 h-auto" alt="right arrow" />
              </button>

              {/* Quiz Button */}
              <button className="flex items-center justify-between rounded-2xl p-6 shadow-lg h-48 bg-gradient-to-r from-secondary-lt to-secondary-dt hover:scale-105 duration-300 hover:bg-gradient-to-l">
                <img src={Quiz} className="w-60 h-auto" alt="Quiz Icon" />
                <p className="text-text-d font-normal text-2xl font-body">
                  Quick Quizzes
                </p>
                <img src={Right} className="w-8 h-auto" alt="right arrow" />
              </button>
            </div>

            {/* Right Column */}
            <div>
              <button className="flex flex-col items-center justify-center bg-gradient-to-r from-secondary-lt to-secondary-dt w-full h-full rounded-2xl p-6 shadow-lg relative hover:scale-105 duration-300 hover:bg-gradient-to-l">
                <div>
                  <img
                    src={Game}
                    className="w-80 h-auto flex flex-col items-center justify-center mb-8 relative top-5 left-12"
                    alt="Game Icon"
                  />
                </div>
                <div className="w-11/12 flex justify-between items-center absolute bottom-10">
                  <p className="text-text-d font-normal text-2xl font-body">
                    Learn through Games
                  </p>
                  <img src={Right} className="w-8 h-auto" alt="right arrow" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
