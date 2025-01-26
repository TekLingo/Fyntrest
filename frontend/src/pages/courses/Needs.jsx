import React from "react";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";
import { GoHome } from "react-icons/go";
import NeedsImg from "../../assets/Images/landing page/course/Needs.png";
import { IoCheckmarkOutline } from "react-icons/io5";
import Module from "../../components/Cards/Module";
import UnlockCard from "../../components/Cards/UnlockCard";
import Footer from "../../components/Footer";
import understanding from "../../assets/Images/landing page/course/basics-of-banking.png";
import understandingImg from "../../assets/Images/landing page/course/Basics-of-budget-2.png";
import Card from "../../components/Cards/Card";

const Needs = () => {
  const pageData = [
    "Understanding Needs And Wants", //heading
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.", //description
    NeedsImg,
  ];

  const moduleContents = [
    {
      title: "Needs vs Wants in Different Situations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit magna interdum, porttitor orci vel, luctus leo. Nam at condimentum ligula, ac ornare purus. Maecenas rhoncus pretium tortor. Proin porta dui eu accumsan faucibus. Aenean varius ante volutpat nisi tempor, vitae molestie elit facilisis. Nulla sit amet vulputate arcu. Praesent nec justo dapibus, porta est nec, euismod arcu. ",
      thumbnail:
        "https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M",
    },
    {
      title: "Needs and Wants in Everyday Life",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit magna interdum, porttitor orci vel, luctus leo. Nam at condimentum ligula, ac ornare purus. Maecenas rhoncus pretium tortor. Proin porta dui eu accumsan faucibus. Aenean varius ante volutpat nisi tempor, vitae molestie elit facilisis. Nulla sit amet vulputate arcu. Praesent nec justo dapibus, porta est nec, euismod arcu.",
      thumbnail: "https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6",
    },
    {
      title: "Needs and Wants in Everyday Life",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit magna interdum, porttitor orci vel, luctus leo. Nam at condimentum ligula, ac ornare purus. Maecenas rhoncus pretium tortor. Proin porta dui eu accumsan faucibus. Aenean varius ante volutpat nisi tempor, vitae molestie elit facilisis. Nulla sit amet vulputate arcu. Praesent nec justo dapibus, porta est nec, euismod arcu.",
      thumbnail: "https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM",
    },
  ];

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
          "Understanding Needs And Wants",
        ]}
      />
      <div className="mx-28 text-text-g gap-16 flex flex-col">
        {/* Heading Section */}
        <div className="w-full my-10">
          <div className="flex col-span-2 gap-32 items-center justify-around">
            <div>
              <div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
                <h1>{pageData[0]}</h1>
              </div>
              <div>
                <p>{pageData[1]}</p>
              </div>
              <div>
                <p>{pageData[1]}</p>
              </div>
            </div>
            <div>
              <img src={pageData[2]} alt="Basics of Financial Literacy" />
            </div>
          </div>
        </div>
        {/* Topics Covered topics */}
        <div className="py-4 max-w-[60%]">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="uppercase text-2xl mb-4">What all is Covered?</h1>
            </div>
            <div className="flex col-span-2 justify-start items-center gap-4">
              <div>
                <IoCheckmarkOutline className="w-8 h-auto text-secondary-lt" />
              </div>
              <div>
                <p className="text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex col-span-2 justify-start items-center gap-4">
              <div>
                <IoCheckmarkOutline className="w-8 h-auto text-secondary-lt" />
              </div>
              <div>
                <p className="text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex col-span-2 justify-start items-center gap-4">
              <div>
                <IoCheckmarkOutline className="w-8 h-auto text-secondary-lt" />
              </div>
              <div>
                <p className="text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Glimpse of module */}
        <div className="flex flex-col gap-6 py-6">
          <h2 className="text-4xl font-body font-bold mb-12">
            Glimpse of Module
          </h2>
          {moduleContents.slice(0, 3).map((content, index) => (
            <Module
              key={index}
              thumbnail={content.thumbnail}
              title={content.title}
              description={content.description}
            />
          ))}
        </div>
        <UnlockCard />
        <div className="">
          <h2 className="text-4xl font-body font-bold">
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

export default Needs;
