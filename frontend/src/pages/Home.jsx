import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import Course from "../assets/Images/landing page/features/courses.png";
import Curriculam from "../assets/Images/landing page/features/curriculam.png";
import Learn from "../assets/Images/landing page/features/personalised.png";
import Tracking from "../assets/Images/landing page/features/tracking.png";
import FeatureCard from "../components/Cards/FeatureCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CourseCarousel from "./CourseCarousel";
import TryOutSection from "../components/TryOutSection";

const Home = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="w-full h-screen bg-cover bg-no-repeat flex flex-col bg-Hero">
        <Navbar />
        <div className="w-full mx-auto text-center flex flex-col mt-40 text-text-g gap-10">
          <h1 className="font-title text-6xl uppercase">fyntrest</h1>
          <h6 className="text-4xl">Financial Education Made Easy</h6>
          <button className="flex gap-4 mx-auto justify-center items-center text-black bg-secondary-d rounded-lg w-52 h-14 hover:scale-105 duration-300">
            Play to discover
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Courses */}
      <div className="w-full flex flex-col gap-10 text-text-g">
        <h1 className="font-body text-6xl text-center font-bold mt-24">
          Courses
        </h1>
        <CourseCarousel isLoggedIn={isLoggedIn} />
      </div>

      {/* Features */}
      <div className="w-full flex flex-col gap-10 text-text-g">
        <h1 className="font-body text-6xl text-center font-bold mt-24">
          Features
        </h1>
        <FeatureCard
          title="Personalised Learning"
          desc="Gamified, interactive courses tailored to each child's pace and
								style, featuring quizzes, challenges, and real-world financial
								scenarios to build money management skills."
          img={Learn}
          inverted={false}
        />
        <FeatureCard
          title="Courses Vetted By Educators"
          desc="Ensure high-quality content aligned with educational standards.
								Our courses are verified by industry experts eg. CAs, CFAs,
								Educators."
          img={Course}
          inverted={true}
        />
        <FeatureCard
          title="Progress Tracking"
          desc="Real-time updates, reports, and parental controls to monitor
								achievements, set goals, and ensure a safe learning experience."
          img={Tracking}
          inverted={false}
        />
        <FeatureCard
          title="Curriculam Integration"
          desc="Aligned with the CBSE curriculum for 8th grade and above,
								offering practical lessons on saving, budgeting, and money
								management."
          img={Curriculam}
          inverted={true}
        />
      </div>

      {/* Tryout Section */}
      <TryOutSection />
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
