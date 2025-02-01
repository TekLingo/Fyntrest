import React from 'react';
import { GoHome } from 'react-icons/go';
import { IoCheckmarkOutline } from 'react-icons/io5';
import Breadcrumb from '../../components/Breadcrumb';
import ModuleLogin from '../../components/Cards/ModuleLogin';
import PracticeTest from '../../components/Cards/PracticeTest';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import courseData from '../../utils/userCourseData';

const LoggedModulePage = () => {
	const { title, description, image, topicsCovered, modules } = courseData;

	return (
		<div>
			<Navbar />
			{/* Breadcrumb Navigation */}
			<Breadcrumb
				items={[
					<GoHome className="h-auto w-6" />,
					'Course',
					'Basics of Financial Literacy',
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
							<img src={image} alt={title} />
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
				<div className="flex flex-col gap-6 py-6">
					<h2 className="text-4xl font-body font-bold mb-12">
						Glimpse of Module
					</h2>
					{modules.slice(0, 3).map((module, index) => (
						<ModuleLogin
							key={index}
							thumbnail={module.thumbnail}
							title={module.title}
							description={module.description}
						/>
					))}
				</div>
				<PracticeTest />
			</div>
			<Footer />
		</div>
	);
};

export default LoggedModulePage;
