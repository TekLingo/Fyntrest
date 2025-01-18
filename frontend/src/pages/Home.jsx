import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../assets/Images/landing page/hero img.png";
import Learn from "../assets/Images/landing page/features/personalised.png";
import Course from "../assets/Images/landing page/features/courses.png";
import Tracking from "../assets/Images/landing page/features/tracking.png";
import Curriculam from "../assets/Images/landing page/features/curriculam.png";
import Game from "../assets/Images/landing page/try out/game.png";
import Knowledge from "../assets/Images/landing page/try out/knowledge.png";
import Quiz from "../assets/Images/landing page/try out/quiz.png";
import { FaChevronRight } from "react-icons/fa6";
import ScrollableDiv from "../components/Cards";

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero */}
      <div
        style={{ backgroundImage: `url(${Hero})` }}
        className="w-full h-screen bg-cover bg-no-repeat flex flex-col"
      >
        <Navbar />
        <div className="w-full mx-auto text-center flex flex-col mt-40 text-text-g gap-16">
          <h1 className="font-tittle text-8xl uppercase">fyntrest</h1>
          <h6 className="text-3xl">Financial Education Made Easy</h6>
          <button className="flex gap-4 mx-auto justify-center items-center text-black bg-secondary-d rounded-lg w-52 h-14 hover:scale-105 duration-300">
            <p className="text-lg text-black text-center font-body">
              Play to discover
            </p>
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Courses */}
      <div className="w-full h-screen">
        <h1 className="font-body text-6xl text-center font-bold text-text-g mt-20">
          Courses
        </h1>
        <div>
          <ScrollableDiv />
        </div>
      </div>

      {/* Features */}
      <div className="w-full h-screen text-text-g">
        <h1 className="font-body text-6xl text-center font-bold  mt-[-200px]">
          Features
        </h1>
        <div className="flex col-span-2 justify-around items-center mx-auto mt-20">
          <div className="max-w-[625px]">
            <div className="text-4xl font-bold font-tittle">
              <h2>Personalised Learning</h2>
            </div>
            <div className="text-lg mt-10">
              <p>
                Gamified, interactive courses tailored to each child's pace and
                style, featuring quizzes, challenges, and real-world financial
                scenarios to build money management skills.
              </p>
            </div>
          </div>
          <div className="">
            <img src={Learn} className="w-96 h-auto" alt="" />
          </div>
        </div>
        <div className="flex col-span-2 justify-around items-center mx-auto mt-20">
          <div className="">
            <img src={Course} className="w-96 h-auto" alt="" />
          </div>
          <div className="max-w-[625px]">
            <div className="text-4xl font-bold font-tittle">
              <h2>Courses Vetted By Educators</h2>
            </div>
            <div className="text-lg mt-10">
              <p>
                Ensure high-quality content aligned with educational standards.
                Our courses are verified by industry experts eg. CAs, CFAs,
                Educators.
              </p>
            </div>
          </div>
        </div>
        <div className="flex col-span-2 justify-around items-center mx-auto mt-20">
          <div className="max-w-[625px]">
            <div className="text-4xl font-bold font-tittle">
              <h2>Progress Tracking</h2>
            </div>
            <div className="text-lg mt-10">
              <p>
                Real-time updates, reports, and parental controls to monitor
                achievements, set goals, and ensure a safe learning experience.
              </p>
            </div>
          </div>
          <div className="">
            <img src={Tracking} className="w-96 h-auto" alt="" />
          </div>
        </div>
        <div className="flex col-span-2 justify-around items-center mx-auto mt-20">
          <div className="">
            <img src={Curriculam} className="w-96 h-auto" alt="" />
          </div>
          <div className="max-w-[625px]">
            <div className="text-4xl font-bold font-tittle">
              <h2>Curriculam Integration</h2>
            </div>
            <div className="text-lg mt-10">
              <p>
                Aligned with the CBSE curriculum for 8th grade and above,
                offering practical lessons on saving, budgeting, and money
                management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tryout */}
      <div className="w-full h-screen text-text-g">
        <h1 className="font-body text-6xl text-center font-bold mt-[1200px] mb-20">
          TryOut
        </h1>
        <div className="grid grid-cols-2 mx-[436px] items-center justify-center gap-4">
          <div className="flex flex-col gap-6">
            <button className="flex col-span-2 justify-around items-center mx-auto bg-secondary-lt w-[500px] rounded-2xl">
              <p className="text-text-d">Test your knowledge</p>
              <img src={Knowledge} className="w-60 h-auto" alt="" />
            </button>
            <button className="flex col-span-2 justify-around items-center mx-auto bg-secondary-dt w-[500px] rounded-2xl">
              <img src={Quiz} className="w-60 h-auto" alt="" />
              <p className="text-text-d">Quick Quizzes</p>
            </button>
          </div>
          <div className="">
            <button className="flex flex-col justify-center mx-auto bg-secondary-dt w-[500px] h-[419px] rounded-2xl">
              <img src={Game} className="w-60 h-auto" alt="" />
              <p className="text-text-d">Learn through Games</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
