import React from "react";
import Right from "../assets/Images/landing page/right.png";
import Game from "../assets/Images/landing page/try out/game.png";
import Knowledge from "../assets/Images/landing page/try out/knowledge.png";
import Quiz from "../assets/Images/landing page/try out/quiz.png";

const TryOutSection = () => {
  return (
    <div className="w-full text-text-g py-20">
      {/* Section Title */}
      <h1 className="font-body text-6xl text-center font-bold mb-20">TryOut</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 w-4/5 mx-auto items-stretch">
        {/* Left Column */}
        <div className="flex flex-col justify-between gap-8">
          {/* Knowledge Button */}
          <button className="flex items-center justify-between bg-gradient-to-r from-secondary-lt to-secondary-dt rounded-2xl p-6 shadow-lg h-48 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-l">
            <p className="text-text-d font-normal text-2xl font-body w-40 text-start">
              Test your knowledge
            </p>
            <img src={Knowledge} className="w-60 h-auto" alt="Knowledge Icon" />
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
  );
};

export default TryOutSection;
