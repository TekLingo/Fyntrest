import React from 'react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/effect-fade'; // Import fade effect style
import { Swiper, SwiperSlide } from 'swiper/react';

// Import components
import CourseCard from '../components/Cards/CourseCard';
import { createSlug } from '../utils/helper';
// Import images
import { Link } from 'react-router-dom';
import BasicImg from '../assets/Images/landing page/course/basicsOfFinLiteracy.png';
import EarnImg from '../assets/Images/landing page/course/Earn.png';
import MoneyImg from '../assets/Images/landing page/course/money.png';
import SaveImg from '../assets/Images/landing page/course/Save.png';

const courseData = [
	{ title: 'Understanding Money', img: MoneyImg },
	{ title: 'Basics of Financial Literacy', img: BasicImg },
	{ title: 'Earning Money', img: EarnImg },
	{ title: 'Saving Money', img: SaveImg },
].map((course) => ({
	...course,
	slug: createSlug(course.title), // Ensure slug is being created
}));

const CourseCarousel = () => {
	return (
		<Swiper
			className="mySwiper"
			slidesPerView={4}
			spaceBetween={20}
			autoplay={{ delay: 3000 }}
			navigation
			pagination={{ clickable: true }}
			effect="fade"
			fadeEffect={{ crossFade: true }}
		>
			{courseData.map((course, index) => (
				<SwiperSlide key={course.slug}>
					<Link
						to={`/course/${course.slug}`}
						className="block w-full h-full flex justify-center"
					>
						<CourseCard title={course.title} img={course.img} index={index} />
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default CourseCarousel;
