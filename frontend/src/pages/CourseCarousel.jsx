import React from 'react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/effect-fade'; // Import fade effect style
import { Swiper, SwiperSlide } from 'swiper/react';

// Import components
import CourseCard from '../components/Cards/CourseCard';

// Import images
import BasicImg from '../assets/Images/landing page/course/basicsOfFinLiteracy.png';
import EarnImg from '../assets/Images/landing page/course/Earn.png';
import MoneyImg from '../assets/Images/landing page/course/money.png';
import SaveImg from '../assets/Images/landing page/course/Save.png';

const courseData = [
	{ title: 'Understanding Money', img: MoneyImg, link: '/money' },
	{ title: 'Basics of Financial Literacy', img: BasicImg, link: '/basics' },
	{ title: 'Earning Money', img: EarnImg, link: '/earn' },
	{ title: 'Saving Money', img: SaveImg, link: '/save' },
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
					<CourseCard
						title={course.title}
						img={course.img}
						index={index}
						link={course.link}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default CourseCarousel;
