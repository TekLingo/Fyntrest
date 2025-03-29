import React from 'react';
import { GoHome } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Cards/Card';
import Glimpse from '../../components/Cards/Glimpse';
import UnlockCard from '../../components/Cards/UnlockCard';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { courses } from '../../utils/courseContent';

const CoursePage = () => {
	const { slug } = useParams();
	const course = courses.find((course) => course.slug === slug);

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
				items={[
					<GoHome key="home-icon" className="h-auto w-6" />,
					'Course',
					course.title,
				]}
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
						{course.modules.slice(0, 2).map((module, index) => (
							<Glimpse
								key={index}
								content={module.title}
								description={module.description}
								topics={module.topics}
							/>
						))}
					</div>
					<UnlockCard marginTop={'96'} />
				</div>

				{/* Check Out Section */}
				<div className="mb-16">
					<h2 className="text-4xl font-body font-bold mb-16">
						People also Check Out!!
					</h2>
					<div className="flex justify-center gap-8">
						{course.relatedCourses.map((relatedCourse, index) => (
							<Card
								key={index}
								title={relatedCourse.title}
								img={relatedCourse.img}
							/>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default CoursePage;
