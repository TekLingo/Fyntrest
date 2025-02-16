import React from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import BlogImg from "../assets/Images/Blog.png";
import BlogReadCard from "../components/Cards/BlogReadCard";

const BlogOpenPage = () => {
  const MoreBlogs = ["lol", "hi", "lol"];

  return (
    <div className="flex flex-col gap-12">
      <Navbar2 />
      {/* Page content */}
      <div className="flex flex-col gap-10">
        <Breadcrumb />

        <div className="text-text-g md:mx-28 mx-5 flex flex-col gap-16">
          {/* title content */}
          <div className="flex flex-col gap-6">
            <h2 className="font-title text-3xl">
              Understanding Emergency Funds: Why You Need One
            </h2>
            <p className="font-body text-gray-400 text-xl">
              <span>Guest Author</span> | <span>Personal Finance</span>
            </p>
          </div>
          <div className="h-80 w-2/5 place-self-center rounded-xl bg-primary-b">
            <img
              src={BlogImg}
              alt=""
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="font-body flex flex-col gap-4">
            <h3 className="font-bold text-xl">Question?</h3>
            <p className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est
              et explicabo exercitationem ipsum sunt esse, beatae omnis
              asperiores at iusto blanditiis ex quisquam, natus nisi illo rerum
              tempora commodi? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nam est et explicabo exercitationem ipsum sunt
              esse, beatae omnis asperiores at iusto blanditiis ex quisquam,
              natus nisi illo rerum tempora commodi?
            </p>
          </div>
          <div className="flex">
            {/* Left content */}
            <div className="w-2/3">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
                voluptate tempora nesciunt possimus commodi perferendis quasi
                libero saepe! Esse ipsam reprehenderit consequuntur quo nostrum
                voluptatem dolor, porro doloremque sunt id? Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Modi voluptate tempora
                nesciunt possimus commodi perferendis quasi libero saepe! Esse
                ipsam reprehenderit consequuntur quo nostrum voluptatem dolor,
                porro doloremque sunt id? Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Modi voluptate tempora nesciunt
                possimus commodi perferendis quasi libero saepe! Esse ipsam
                reprehenderit consequuntur quo nostrum voluptatem dolor, porro
                doloremque sunt id? Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Modi voluptate tempora nesciunt possimus
                commodi perferendis quasi libero saepe! Esse ipsam reprehenderit
                consequuntur quo nostrum voluptatem dolor, porro doloremque sunt
                id? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Modi voluptate tempora nesciunt possimus commodi perferendis
                quasi libero saepe! Esse ipsam reprehenderit consequuntur quo
                nostrum voluptatem dolor, porro doloremque sunt id? Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Modi voluptate
                tempora nesciunt possimus commodi perferendis quasi libero
                saepe! Esse ipsam reprehenderit consequuntur quo nostrum
                voluptatem dolor, porro doloremque sunt id?
              </p>
            </div>
            {/* Right content */}
            <div className="w-1/3 flex justify-end items-center">
              <img
                src={BlogImg}
                alt=""
                className="h-auto w-auto max-h-80 max-w-96 object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="font-body flex flex-col gap-4">
            <h3 className="font-bold text-xl">Question?</h3>
            <p className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est
              et explicabo exercitationem ipsum sunt esse, beatae omnis
              asperiores at iusto blanditiis ex quisquam, natus nisi illo rerum
              tempora commodi? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nam est et explicabo exercitationem ipsum sunt
              esse, beatae omnis asperiores at iusto blanditiis ex quisquam,
              natus nisi illo rerum tempora commodi?
            </p>
          </div>
          <div className="font-body flex flex-col gap-4">
            <h3 className="font-bold text-xl">Question?</h3>
            <p className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est
              et explicabo exercitationem ipsum sunt esse, beatae omnis
              asperiores at iusto blanditiis ex quisquam, natus nisi illo rerum
              tempora commodi? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nam est et explicabo exercitationem ipsum sunt
              esse, beatae omnis asperiores at iusto blanditiis ex quisquam,
              natus nisi illo rerum tempora commodi?
            </p>
          </div>
        </div>
      </div>
      <div className="text-text-g flex flex-col gap-8 md:mx-28 mx-5">
        <h4 className="place-self-center font-body text-3xl">Also Read</h4>
        <div className="flex gap-10">
          {MoreBlogs.map((blog, index) => (
            <BlogReadCard key={index} title={blog} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogOpenPage;
