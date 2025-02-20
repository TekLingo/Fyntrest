import React from "react";
import SemesterCard from "../../components/Cards/SemesterCard";
import Navbar2 from "../../components/Navbar2";
import Footer from "../../components/Footer";

const Semester = () => {
  const semesterData = [
    {
      content: "Semester 1",
      description: "Introduction to foundational concepts in Computer Science.",
      topics: [
        {
          title: "Introduction to C Programming",
          img: "https://via.placeholder.com/150",
        },
        {
          title: "Mathematics for Computing",
          img: "https://via.placeholder.com/150",
        },
        {
          title: "Digital Logic Design",
          img: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      content: "Semester 2",
      description: "Expanding on programming and basic data structures.",
      topics: [
        {
          title: "Data Structures & Algorithms",
          img: "https://via.placeholder.com/150",
        },
        {
          title: "Object-Oriented Programming",
          img: "https://via.placeholder.com/150",
        },
        {
          title: "Computer Organization",
          img: "https://via.placeholder.com/150",
        },
      ],
    },
  ];

  return (
    <div className="text-text-g flex flex-col gap-10">
      <Navbar2 />
      <div className="flex flex-col gap-4 mx-28">
        <div></div>
        {semesterData.map((semester, index) => (
          <SemesterCard
            key={index}
            content={semester.content}
            description={semester.description}
            topics={semester.topics}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Semester;
