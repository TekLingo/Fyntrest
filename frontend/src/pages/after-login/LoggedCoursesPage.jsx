import React from 'react';
import { GoHome } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Cards/Card';
import GlimpseLogin from '../../components/Cards/GlimpseLogin';
import PracticeTest from '../../components/Cards/PracticeTest';
import UnlockCard from '../../components/Cards/UnlockCard';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { courses } from '../../utils/courseContent';

const LoginCoursePage = () => {
	const course = courses[1];

	if (!course) {
		return (
			<div className="text-center text-2xl font-bold mt-10">
				Course not found
			</div>
		);
	}

	return (
		<div>
			<Navbar />
			<Breadcrumb
				items={[<GoHome className="h-auto w-6" />, 'Course', course.title]}
			/>
			<div className="mx-28 text-text-g">
				{/* Heading Section */}
				<div className="w-full my-10">
					<div className="flex col-span-2 gap-32 items-center justify-around">
						<div>
							<div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
								<h1>{course.title}</h1>
							</div>
							{course.description.map((paragraph, index) => (
								<div key={index} className="py-4">
									<p>{paragraph}</p>
								</div>
							))}
						</div>
						<div>
							<img
								src={course.img}
								alt={course.title}
								className="max-w-full h-auto"
							/>
						</div>
					</div>
				</div>

				{/* Course Content */}
				<div className="py-4">
					<h2 className="text-4xl font-body font-bold mb-12">
						Glimpse of Course
					</h2>
					<div className="flex flex-col gap-6 py-6">
						{course.modules.map((module, index) => (
							<GlimpseLogin
								key={index}
								content={module.title}
								description={module.description}
								topics={module.topics}
							/>
						))}
					</div>
				</div>

				<PracticeTest />
			</div>
			<Footer />
		</div>
	);
};

export default LoginCoursePage;
