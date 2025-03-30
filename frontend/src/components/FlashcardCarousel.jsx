import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import FlashCard from './Cards/FlashCard';

const FlashcardCarousel = () => {
	
	return (
		<div>
			{/* Heading */}
			<div className="text-text-g mb-10">
				<div>
					<h2 className="text-4xl font-body font-bold mb-16">Flashcards</h2>
				</div>
			</div>

			{/* Swiper Carousel */}
			<Swiper
				className="flashCardSwiper"
				slidesPerView={2} // Number of slides visible at once
				spaceBetween={460} // Space between slides
				loop={true} // Enable infinite loop
				grabCursor={true} // Show grab cursor on hover
				navigation={false}
				pagination={false}
			>
				{/* Swiper Slides */}
				<SwiperSlide>
					<FlashCard />
				</SwiperSlide>
				<SwiperSlide>
					<FlashCard />
				</SwiperSlide>
				<SwiperSlide>
					<FlashCard />
				</SwiperSlide>
				<SwiperSlide>
					<FlashCard />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default FlashcardCarousel;
