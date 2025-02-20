import React from 'react';
import { GoHome } from 'react-icons/go';
import { MdOutlinePlayCircle } from 'react-icons/md';
import understanding from '../../assets/Images/landing page/course/basics-of-banking.png';
import understandingImg from '../../assets/Images/landing page/course/Basics-of-budget-2.png';
import Breadcrumb from '../components/Breadcrumb';
import Card from '../components/Cards/Card';
import UnlockCard from '../components/Cards/UnlockCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const VideoPage = () => {
	const pageData = [
		'Understanding Needs And Wants', //heading
		'Lorem ipsum dolor sit amet consectetur adipisicing elit.Eligendi, voluptatum autem commodi, quae quis earum maioresconsectetur ad officia eaque doloremque? Consectetur doloressequi aliquam veniam id, placeat itaque quam. Lorem ipsumdolor sit, amet consectetur adipisicing elit. Iusto assumendaeum praesentium beatae architecto consectetur veniam, maximeoptio. Maiores, voluptatem temporibus. Quas pariaturinventore, nemo tenetur recusandae ab reiciendis neque!', //description
	];

	const Video = [
		'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
		'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
	];

	// Card content for related topics
	const cardContent = [
		{ title: 'Basics of Banking', img: understanding },
		{ title: 'Understanding Money', img: understanding },
		{ title: 'Basics of Budget', img: understandingImg },
	];

	return (
		<div>
			<Navbar />
			{/* Breadcrumb Navigation */}
			<Breadcrumb
				items={[
					<GoHome className="h-auto w-6" />,
					'Course',
					'Basics of Financial Literacy',
					'Understanding Needs And Wants',
				]}
			/>
			<div className="mx-28 text-text-g gap-16 flex flex-col">
				{/* Heading Section */}
				<div className="w-full my-10">
					<div className="flex col-span-2 gap-32 items-center justify-around">
						<div>
							<div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
								<h1>{pageData[0]}</h1>
							</div>
							<div className="text-md">
								<p>{pageData[1]}</p>
							</div>
						</div>
					</div>
				</div>
				{/* Video Section */}
				<div className="w-full h-screen">
					<iframe
						className="w-full h-full"
						src={Video[0]}
						title="Course Video Thumbnail"
						allowFullScreen
					/>
				</div>
				{/* Up next */}
				<div>
					<h2 className="text-4xl font-body font-bold mb-8">Up Next</h2>
					<div className="w-full h-60 mr-4 flex gap-8">
						<div className="w-1/3 relative rounded-lg overflow-hidden">
							<div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center text-text-g">
								<MdOutlinePlayCircle className="text-3xl" size={60} />
							</div>
							<iframe
								className="w-full h-60"
								src={Video[0]}
								title="Course Video Thumbnail"
								allowFullScreen
							/>
						</div>
						<div className="w-1/3 relative rounded-lg overflow-hidden">
							<div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center text-text-g">
								<MdOutlinePlayCircle className="text-3xl" size={60} />
							</div>
							<iframe
								className="w-full h-60"
								src={Video[0]}
								title="Course Video Thumbnail"
								allowFullScreen
							/>
						</div>
					</div>
				</div>
				<UnlockCard />
				{/* Check Out Section */}
				<div className="mb-16">
					<h2 className="text-4xl font-body font-bold mb-16">
						People also Check Out!!
					</h2>
					<div className="flex justify-center gap-8">
						{cardContent.map((item, index) => (
							<Card key={index} title={item.title} img={item.img} />
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default VideoPage;
