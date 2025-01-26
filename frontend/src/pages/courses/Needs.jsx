import React from "react";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";
import { GoHome } from "react-icons/go";
import NeedsImg from "../../assets/Images/landing page/course/Needs.png";
import { IoCheckmarkOutline } from "react-icons/io5";
import Module from "../../components/Cards/Module";
import UnlockCard from "../../components/Cards/UnlockCard";

const Needs = () => {
  const courseContents = [
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
      thumbnail:
        "https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="mx-28 text-text-g gap-16 flex flex-col">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            <GoHome className="h-auto w-6" />,
            "Course",
            "Basics of Financial Literacy",
            "",
          ]}
        />
        {/* Heading Section */}
        <div className="w-full my-10">
          <div className="flex col-span-2 gap-32 items-center justify-around">
            <div>
              <div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
                <h1>Understanding Needs And Wants</h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit Understanding Needs And Wantsamet
                  consectetur, adipisicing elit. Totam, nesciunt architecto
                  recusandae nemo mollitia quasi a modi ipsum dolor molestias
                  quas eos quidem reprehenderit, porro tenetur harum doloremque
                  consectetur beatae.
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
              <img src={NeedsImg} alt="Basics of Financial Literacy" />
            </div>
          </div>
        </div>
        {/* Topics Covered topics */}
        <div className="py-4 max-w-[60%]">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="uppercase text-xl mb-4">What all is Covered?</h1>
            </div>
            <div className="flex col-span-2 justify-start items-center gap-8">
              <div>
                <IoCheckmarkOutline className="w-8 h-auto text-secondary-lt" />
              </div>
              <div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex col-span-2 justify-start items-center gap-8">
              <div>
                <IoCheckmarkOutline className="w-8 h-auto text-secondary-lt" />
              </div>
              <div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex col-span-2 justify-start items-center gap-8">
              <div>
                <IoCheckmarkOutline className="w-8 h-auto text-secondary-lt" />
              </div>
              <div>
                <p className="text-sm">
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
          {courseContents.slice(0, 3).map((content, index) => (
            <Module
              key={index}
              thumbnail={content.thumbnail}
              title={content.title}
              description={content.description}
            />
          ))}
        </div>
        <UnlockCard />
      </div>
    </div>
  );
};

export default Needs;
