import React from 'react';
import { GoHome } from 'react-icons/go';
import { IoCheckmarkOutline } from 'react-icons/io5';
import basicsOfBanking from '../../assets/Images/landing page/course/basics-of-banking.png';
import needs from '../../assets/Images/landing page/course/Needs.png';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Cards/Card';
import Module from '../../components/Cards/Module';
import UnlockCard from '../../components/Cards/UnlockCard';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import courseData from '../../utils/userCourseData'; // Import the dummy data

const ModulePage = () => {
	const { title, description, topicsCovered, modules, relatedCourses } =
		courseData;

	return (
		<div>
			<Navbar />
			{/* Breadcrumb Navigation */}
			<Breadcrumb
				items={[
					<GoHome key="home-icon" className="h-auto w-6" />,
					'Course',
					'Module',
					title,
				]}
			/>
			<div className="mx-28 text-text-g gap-16 flex flex-col">
				{/* Heading Section */}
				<div className="w-full my-10">
					<div className="flex col-span-2 gap-32 items-center justify-around">
						<div>
							<div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
								<h1>{title}</h1>
							</div>
							<div>
								<p>{description}</p>
							</div>
							<div>
								<p>{description}</p>
							</div>
						</div>
						<div>
							<img src={needs} alt={title} />
						</div>
					</div>
				</div>
				{/* Topics Covered topics */}
				<div className="py-4 max-w-[60%]">
					<div className="flex flex-col gap-4">
						<div>
							<h1 className="uppercase text-2xl mb-4">What all is Covered?</h1>
						</div>
						{topicsCovered.map((topic, index) => (
							<div
								key={index}
								className="flex col-span-2 justify-start items-center gap-4"
							>
								<div>
									<IoCheckmarkOutline className="w-8 h-auto text-secondary-lt" />
								</div>
								<div>
									<p className="text-md">{topic}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Glimpse of module */}
				<div className="py-4">
					<h2 className="text-4xl font-body font-bold">Glimpse of Module</h2>
					<div className="flex flex-col gap-6 py-6">
						{modules.slice(0, 3).map((module, index) => (
							<Module
								key={index}
								thumbnail={module.thumbnail}
								title={module.title}
								description={module.description}
							/>
						))}
					</div>
					<UnlockCard marginTop={240} />
				</div>
				{/* Check Out Section */}
				<div className="mb-16">
					<h2 className="text-4xl font-body font-bold mb-16">
						People also Check Out!!
					</h2>
					<div className="flex justify-center gap-8">
						{relatedCourses.map((relatedCourse, index) => (
							<Card
								key={index}
								title={relatedCourse.title}
								img={basicsOfBanking}
							/>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ModulePage;
