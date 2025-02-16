import React from "react";
import Navbar2 from "../components/Navbar2";
import BlogCard from "../components/Cards/BlogCard";
import BlogImg from "../assets/Images/Blog.png";
import Footer from "../components/Footer";

const BlogPage = () => {
  const blogData = [
    {
      title: "Understanding Emergency Funds: Why You Need One",
      author: "Guest Author",
      category: "Personal Finance",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      image: BlogImg,
    },
    {
      title: "Investing Basics: How to Start with Small Amounts",
      author: "Jane Doe",
      category: "Investing",
      content: "Getting started with investing can be intimidating...",
      image: BlogImg,
    },
    {
      title: "How to Save Money on Everyday Expenses",
      author: "John Smith",
      category: "Savings",
      content: "Discover practical tips to cut costs and save more...",
      image: BlogImg,
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <Navbar2 />
      <div className="flex flex-col gap-20">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            author={blog.author}
            category={blog.category}
            content={blog.content}
            image={blog.image}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
