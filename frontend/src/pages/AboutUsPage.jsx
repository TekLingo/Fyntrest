import React from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import AboutUsCard from "../components/Cards/AboutUsCard";

const AboutUsPage = () => {
  return (
    <div className="flex-col flex gap-10 text-text-g">
      <Navbar2 />
      {/* Page Section */}
      <div className="mx-24 flex-col flex gap-20">
        <h1 className="font-title text-6xl">About Us</h1>
        <div className="flex-col flex gap-4">
          <h2 className="font-title text-3xl text-secondary-d">
            Fyntrest story time
          </h2>
          <div className="flex flex-col gap-4 text-lg font-body">
            <p>
              Imagine stepping into the real world, earning your first paycheck,
              or even just managing your pocket money—but no one ever taught you
              how. Sounds overwhelming, right?
            </p>
            <p className="font-bold">
              That’s exactly the gap we saw, and which is why Fyntrest was born.
            </p>
            <p>
              We believe that financial literacy isn’t just for adults—it’s a
              superpower that every student should have. Yet, schools rarely
              teach how to save, spend, or invest wisely. So, we set out to
              change that.
            </p>
            <p>
              At Fyntrest, we take the mystery out of money by turning financial
              concepts into exciting animated stories, fun quizzes, and
              interactive tools. Whether it’s understanding savings, digital
              payments, or even budgeting like a pro, we make learning about
              money simple, engaging, and—dare we say—fun!
            </p>
          </div>
        </div>
        <div className="flex-col flex gap-4">
          <h2 className="font-title text-3xl text-secondary-d">Mission</h2>
          <div className="flex flex-col gap-4 text-lg font-body">
            <p>
              At Fyntrest, our mission is to empower young minds with essential
              financial skills that will prepare them for life beyond the
              classroom. We believe that understanding money is just as
              important as any other subject, and we strive to make financial
              education engaging, interactive, and accessible for all students.
            </p>
            <p>We aim to:</p>
            <div className="flex gap-8">
              <AboutUsCard />
            </div>
            <p>
              By equipping students with the right knowledge and tools, we’re
              helping them step into the future with financial confidence and
              independence.
            </p>
          </div>
        </div>
        <div className="flex-col flex gap-4">
          <h2 className="font-title text-3xl text-secondary-d">Vision</h2>
          <div className="flex flex-col gap-4 text-lg font-body">
            <p>
              We envision a future where every student in India is financially
              literate, capable of making smart money decisions that shape their
              personal success and contribute to society.
            </p>
            <p>Our goal is to:</p>
            <div className="flex gap-8">
              <AboutUsCard />
            </div>
            <p>
              By equipping students with the right knowledge and tools, we’re
              helping them step into the future with financial confidence and
              independence.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
