import React, { useEffect, useState } from 'react';
import { GoHome } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import GlimpseLogin from '../../components/Cards/GlimpseLogin';
import PracticeTest from '../../components/Cards/PracticeTest';
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import axiosInstance from '../../utils/axiosInstance';

const LoginCoursePage = () => {
	const { courseId } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Separate states for title, description, and imageUrl
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [courseImageUrl, setCourseImageUrl] = useState('');
	const [modules, setModules] = useState([]);

	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const res = await axiosInstance.get(`/courses/${courseId}`);
				if (res.status === 200 && res.data) {
					const course = res.data;
					setCourseTitle(course.title);
					setCourseDescription(course.description);
					setCourseImageUrl(course.image);
					setModules(course.modules || []);
				} else {
					throw new Error('Invalid response from server');
				}
			} catch (err) {
				console.error('Error fetching course:', err);
				setError('Course not found');
			} finally {
				setLoading(false);
			}
		};

		fetchCourseData();
	}, [courseId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error || !courseTitle) {
		return (
			<div className="text-center text-2xl font-bold mt-10">
				{error || 'Course not found'}
			</div>
		);
	}

	return (
		<div>
			<Navbar2 />
			<Breadcrumb
				items={[
					<GoHome key="home-icon" className="h-auto w-6" />,
					'User',
					'Course',
					courseTitle,
				]}
			/>
			<div className="mx-28 text-text-g">
				{/* Heading Section */}
				<div className="w-full my-10">
					<div className="flex flex-col md:flex-row gap-32 items-center justify-around">
						<div>
							<div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
								<h1>{courseTitle}</h1>
							</div>
							{Array.isArray(courseDescription) ? (
								courseDescription.map((paragraph, index) => (
									<div key={index} className="py-4">
										<p>{paragraph}</p>
									</div>
								))
							) : (
								<p>{courseDescription}</p>
							)}
						</div>
						<div>
							<img
								src={courseImageUrl || '/assets/default-course.jpg'}
								alt={courseTitle}
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
						{modules && modules.length > 0 ? (
							modules.map((module, index) => {
								// Log each module and its id for debugging.
								console.log(`Module ${index} details:`, module);
								console.log(`Module ${index} ID:`, module.id);

								// If your API returns _id instead of id, you may need to change module.id to module._id
								return (
									<GlimpseLogin
										key={index}
										moduleId={module._id}
										content={module.title}
										description={module.description}
										topics={module.topics}
									/>
								);
							})
						) : (
							<p>No modules available</p>
						)}
					</div>
				</div>

				<PracticeTest />
			</div>
			<Footer />
		</div>
	);
};

export default LoginCoursePage;
