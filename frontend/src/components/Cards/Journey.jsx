import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Import images
import completed from '../../assets/Images/landing page/after-login/completed.png';
import end from '../../assets/Images/landing page/after-login/end-journey.png';
import locked from '../../assets/Images/landing page/after-login/locked.png';
import journeyPath from '../../assets/Images/landing page/after-login/path.png';
import unlocked from '../../assets/Images/landing page/after-login/unlocked.png';

const statusImages = {
	completed,
	locked,
	unlocked,
};

const Journey = () => {
	const [enrolledCourses, setEnrolledCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchEnrollments = async () => {
			try {
				const token = localStorage.getItem('token'); // Retrieve token from localStorage
				if (!token) {
					throw new Error('No authentication token found');
				}

				const response = await axios.get('/enrollments', {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (response.data.success) {
					// Process enrollments to calculate module statuses
					const processedEnrollments = response.data.enrollments.map(
						(enrollment) => {
							const course = enrollment.course;
							const progress = enrollment.progress || 0;
							const totalModules = course.modules.length;
							const completedModulesCount = Math.floor(
								(progress / 100) * totalModules
							);

							const modulesWithStatus = course.modules.map((module, index) => {
								let status;
								if (index < completedModulesCount) {
									status = 'completed';
								} else if (index === completedModulesCount) {
									status = 'unlocked';
								} else {
									status = 'locked';
								}
								return { ...module, status };
							});

							return {
								...enrollment,
								course: { ...course, modules: modulesWithStatus },
							};
						}
					);

					setEnrolledCourses(processedEnrollments);
				} else {
					setError(response.data.message);
				}
			} catch (err) {
				setError('Failed to fetch enrollments: ' + err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchEnrollments();
	}, []);

	if (loading) {
		return <div>Loading your journey...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="my-40">
			<div className="mx-[5%] border-4 rounded-3xl flex flex-col justify-center items-center px-[5%] pt-[5%] text-text-g border-secondary-lt shadow-lg">
				<h1 className="font-title text-3xl">Your Journey</h1>
				<div className="relative w-full h-[760px] overflow-scroll">
					<img
						src={journeyPath}
						alt="Journey Path"
						className="absolute top-28 object-cover"
					/>
					<div className="relative z-10 flex flex-col gap-28">
						{enrolledCourses.length === 0 ? (
							<p>You are not enrolled in any courses yet.</p>
						) : (
							enrolledCourses.map((enrollment, index) => {
								const course = enrollment.course;
								return (
									<div key={course._id} className="flex flex-col gap-36">
										{/* Course Header */}
										<div className="flex items-center gap-4">
											<div className="w-[124px]">
												<img src={course.image} alt={course.title} />
											</div>
											<div className="text-2xl">
												<h3>Course {index + 1}:</h3>
												<h1>{course.title}</h1>
											</div>
										</div>

										{/* Modules Grid */}
										<div className="mx-28 gap-x-16 gap-y-32 flex flex-wrap text-center">
											{course.modules.map((module) => (
												<div
													key={module._id}
													className="flex flex-col max-w-44 gap-2"
												>
													<img
														src={statusImages[module.status]}
														alt={module.status}
													/>
													<h3 className="text-center">{module.title}</h3>
												</div>
											))}
										</div>
									</div>
								);
							})
						)}
						{/* End Journey */}
						<div className="relative flex items-center justify-end -top-28">
							<div className="w-[300px]">
								<img
									src={end}
									alt="Completed"
									className="w-[300px] h-[300px] object-contain"
								/>
							</div>
							<div className="text-3xl w-48">
								<h1>Continue next Semester</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Journey;
