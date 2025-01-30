import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CourseCard from '../components/Cards/CourseCard';
import { courses } from '../utils/courseContent';

const CourseCarousel = () => {
	if (!courses || courses.length === 0) {
		return <div>No courses available.</div>;
	}

	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay, EffectFade]}
			slidesPerView={4}
			spaceBetween={20}
		>
			{courses.map((course, index) => (
				<SwiperSlide key={course.slug}>
					<Link to={`/course/${course.slug}`}>
						<CourseCard
							title={course.title}
							img={course.img}
							description={course.description[0]}
							index={index}
						/>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default CourseCarousel;
