import React from "react";
import SemesterCard from "../../components/Cards/SemesterCard";
import Navbar2 from "../../components/Navbar2";
import Footer from "../../components/Footer";
import ContinueCard from "../../components/Cards/ContinueCard";
import PracticeTest from "../../components/Cards/PracticeTest";
import CourseImg from "../../assets/Images/landing page/course/Earn.png";

const Semester = () => {
  const semesterData = [
    {
      content: "Semester 1",
      topics: [
        {
          title: "Introduction to C Programming",
          description:
            "Introduction to foundational concepts in Computer Science.",
          img: { CourseImg },
        },
        {
          title: "Mathematics for Computing",
          description:
            "Introduction to foundational concepts in Computer Science.",
          img: { CourseImg },
        },
        {
          title: "Digital Logic Design",
          description:
            "Introduction to foundational concepts in Computer Science.",
          img: { CourseImg },
        },
      ],
    },
    {
      content: "Semester 2",
      topics: [
        {
          title: "Data Structures & Algorithms",
          description: "Expanding on programming and basic data structures.",
          img: "https://via.placeholder.com/150",
        },
        {
          title: "Object-Oriented Programming",
          description: "Expanding on programming and basic data structures.",
          img: "https://via.placeholder.com/150",
        },
        {
          title: "Computer Organization",
          description: "Expanding on programming and basic data structures.",
          img: "https://via.placeholder.com/150",
        },
      ],
    },
  ];

  return (
    <div className="text-text-g flex flex-col gap-16">
      <Navbar2 />
      <div className="flex flex-col gap-12 mx-28">
        <div>
          <ContinueCard />
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="font-body text-3xl font-bold">Courses</h2>
          <div className="flex flex-col gap-4">
            {semesterData.map((semester, index) => (
              <SemesterCard
                key={index}
                content={semester.content}
                description={semester.description}
                topics={semester.topics}
                index={index}
              />
            ))}
          </div>
        </div>
        <PracticeTest />
      </div>
      <Footer />
    </div>
  );
};

export default Semester;
