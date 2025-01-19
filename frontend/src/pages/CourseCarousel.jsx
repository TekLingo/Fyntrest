import React from 'react';
// Import Swiper React components
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/effect-fade'; // Import fade effect style
import { Swiper, SwiperSlide } from 'swiper/react';

// Import components
import CourseCard from '../components/Cards/CourseCard';

// Import images
import MoneyImg from '../assets/Images/landing page/course/money.png';

const courseData = [
	{ title: 'Understanding Money', img: MoneyImg },
	{ title: 'Understanding Money', img: MoneyImg },
	{ title: 'Understanding Money', img: MoneyImg },
	{ title: 'Understanding Money', img: MoneyImg },
	{ title: 'Understanding Money', img: MoneyImg },
];

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
					<CourseCard title={course.title} img={course.img} index={index} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default CourseCarousel;
