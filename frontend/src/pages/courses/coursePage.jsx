import React from "react";
import { useParams } from "react-router-dom"; // Hook to get the slug from the URL

const courseData = [
  {
    title: "Understanding Money",
    slug: "understanding-money",
    description: "Learn the basics of money",
  },
  {
    title: "Basics of Financial Literacy",
    slug: "basics-of-financial-literacy",
    description: "Learn financial literacy",
  },
  {
    title: "Earning Money",
    slug: "earning-money",
    description: "Learn how to earn money",
  },
  {
    title: "Saving Money",
    slug: "saving-money",
    description: "Learn how to save money",
  },
];

const CoursePage = () => {
  const { slug } = useParams(); // Get the dynamic slug from the URL

  // Find the course based on the slug
  const course = courseData.find((course) => course.slug === slug);

  if (!course) {
    return <p>Course not found</p>; // Handle case where the course is not found
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      {/* You can display more content about the course here */}
    </div>
  );
};

export default CoursePage;
