import React from "react";
import { GoHome } from "react-icons/go";
import understanding from "../../assets/Images/landing page/course/basics-of-banking.png";
import understandingImg from "../../assets/Images/landing page/course/Basics-of-budget-2.png";
import basicImg from "../../assets/Images/landing page/course/basicsOfFinLiteracy.png";
import Breadcrumb from "../../components/Breadcrumb";
import Card from "../../components/Cards/Card";
import Glimpse from "../../components/Cards/Glimpse";
import UnlockCard from "../../components/Cards/UnlockCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Money = () => {
  // Module content for each topic
  const courseContents = [
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
    {
      title: "Spending Choices",
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

  // Card content for related topics
  const cardContent = [
    { title: "Basics of Banking", img: understanding },
    { title: "Understanding Money", img: understanding },
    { title: "Basics of Budget", img: understandingImg },
  ];

  return (
    <div>
      <Navbar />
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          <GoHome className="h-auto w-6" />,
          "Course",
          "Basics of Financial Literacy",
        ]}
      />
      <div className="mx-28 text-text-g">
        {/* Heading Section */}
        <div className="w-full my-10">
          <div className="flex col-span-2 gap-32 items-center justify-around">
            <div>
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
            <div>
              <img src={basicImg} alt="Basics of Financial Literacy" />
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="py-4">
          <h2 className="text-4xl font-body font-bold mb-12">
            Glimpse of Course
          </h2>
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
          <UnlockCard />
        </div>

        {/* Check Out Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-body font-bold mb-16">
            People also Check Out!!
          </h2>
          <div className="flex justify-center gap-8">
            {cardContent.map((item, index) => (
              <Card key={index} title={item.title} img={item.img} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Money;
