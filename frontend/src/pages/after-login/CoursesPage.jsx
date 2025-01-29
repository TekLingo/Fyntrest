import React from "react";
import Navbar2 from "../../components/Navbar2";
import ContinueCard from "../../components/Cards/ContinueCard";
import PracticeTest from "../../components/Cards/PracticeTest";
import Footer from "../../components/Footer";
import Glimpse from "../../components/Cards/Glimpse";

const CoursesPage = () => {
  const courseContents = [
    {
      title: "Semester 1",
      aboutCourse: [
        {
          heading: "Understanding Money",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum saepe vero, reiciendis ipsam sapiente perspiciatis unde. Modi veritatis dignissimos repellendus, consequatur nam eos qui, delectus autem, cum quis reprehenderit facilis!",
          img: "",
        },       
        {
          heading: "Basics of Financial Litracy",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum saepe vero, reiciendis ipsam sapiente perspiciatis unde. Modi veritatis dignissimos repellendus, consequatur nam eos qui, delectus autem, cum quis reprehenderit facilis!",
          img: "",
        },       
        {
          heading: "Earning Money",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum saepe vero, reiciendis ipsam sapiente perspiciatis unde. Modi veritatis dignissimos repellendus, consequatur nam eos qui, delectus autem, cum quis reprehenderit facilis!",
          img: "",
        },       
        {
          heading: "Saving Money",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum saepe vero, reiciendis ipsam sapiente perspiciatis unde. Modi veritatis dignissimos repellendus, consequatur nam eos qui, delectus autem, cum quis reprehenderit facilis!",
          img: "",
        },       
        {
          heading: "Basics of Banking",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum saepe vero, reiciendis ipsam sapiente perspiciatis unde. Modi veritatis dignissimos repellendus, consequatur nam eos qui, delectus autem, cum quis reprehenderit facilis!",
          img: "",
        },       
      ],
    },
    {
      title: "Semester 2",
      description:
        "This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.",
      topics: [
        {
          title: "Needs vs Wants in different situations",
          videoSrc: "https://youtube.com/embed/cAkMcPfY_Ns?si=L0n9Sanryc576JxS",
        },
        {
          title: "Needs and Wants in everyday life",
          videoSrc: "https://youtube.com/embed/M9O5AjEFzKw?si=Qx7Mlrllj0iM08hu",
        },
        {
          title: "Prioritizing needs over wants",
          videoSrc: "https://youtube.com/embed/rAejJBmo55Y?si=6jh4W-o8ODHOH7BP",
        },
      ],
    },
    {
      title: "Understanding Needs and Wants",
      description:
        "This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.",
      topics: [
        {
          title: "Needs vs wants in different situations",
          videoSrc:
            "https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M",
        },
        {
          title: "Needs and wants in everyday life",
          videoSrc: "https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6",
        },
        {
          title: "Prioritizing needs over wants",
          videoSrc: "https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM",
        },
      ],
    },
  ];

  return (
    <div>
      <Navbar2 />
      <div className="mx-[4%] gap-10 flex flex-col my-10">
        {/* Welcome Section */}
        <div>
          <ContinueCard />
        </div>
        {/* Semester Section */}
        <div className="text-text-g">
          <div>
            <h2 className="text-4xl font-body font-bold mb-16">Courses</h2>
          </div>
          <div>
            <div className="flex flex-col gap-6 py-6">
              {courseContents.slice(0, 2).map((content, index) => (
                <Glimpse
                  key={index}
                  content={content.title}
                  description={content.description}
                  topics={content.topics}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Practice Test Section */}
        <div>
          <PracticeTest />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
