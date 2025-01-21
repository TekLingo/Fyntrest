import React from "react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/effect-fade"; // Import fade effect style
import { Swiper, SwiperSlide } from "swiper/react";

// Import components
import CourseCard from "../components/Cards/CourseCard";
import { createSlug } from "../utils/helper";
// Import images
import BasicImg from "../assets/Images/landing page/course/basicsOfFinLiteracy.png";
import EarnImg from "../assets/Images/landing page/course/Earn.png";
import MoneyImg from "../assets/Images/landing page/course/money.png";
import SaveImg from "../assets/Images/landing page/course/Save.png";

const courseData = [
  { title: "Understanding Money", img: MoneyImg },
  { title: "Basics of Financial Literacy", img: BasicImg },
  { title: "Earning Money", img: EarnImg },
  { title: "Saving Money", img: SaveImg },
].map((course) => ({
  ...course,
  link: `/course/${createSlug(course.title)}`,
}));

const CourseCarousel = () => {
  return (
    <Swiper
      className="mySwiper"
      slidesPerView={4}
      autoplay={{ delay: 3000 }}
      navigation
      pagination={{ clickable: true }}
      effect="fade" // Add fade effect
      fadeEffect={{ crossFade: true }} // Crossfade between slides
      spaceBetween={20} // Optional: space between slides
    >
      {courseData.map((course, index) => (
        <SwiperSlide key={index}>
          <Link to={`/course/${course.slug}`}>
            {/* Link to dynamic course page */}
            <CourseCard title={course.title} img={course.img} index={index} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseCarousel;
