import React, { useEffect, useState } from 'react';
import ContinueCard from '../../components/Cards/ContinueCard';
import PracticeTest from '../../components/Cards/PracticeTest';
import SemesterCard from '../../components/Cards/SemesterCard';
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import axiosInstance from '../../utils/axiosInstance';

const Semester = () => {
	const [semesterData, setSemesterData] = useState([]);
	const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchSemestersAndUser = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					console.error('No token found');
					return;
				}

				const userResponse = await axiosInstance.get('/get-user', {
					headers: { Authorization: `Bearer ${token}` },
				});
				const userData = userResponse.data.user;
				setUser(userData);

				if (userData && userData._id) {
					const semesterResponse = await axiosInstance.get('/get-semesters', {
						headers: { Authorization: `Bearer ${token}` },
						params: { userId: userData._id },
					});
					const semesterData = semesterResponse.data.semesters;

					const enrollmentsResponse = await axiosInstance.get('/enrollments', {
						headers: { Authorization: `Bearer ${token}` },
					});
					const enrolledCourseIds = enrollmentsResponse.data.enrollments.map(
						(enrollment) => enrollment.course._id.toString()
					);
					setEnrolledCourseIds(enrolledCourseIds);

					if (semesterData && semesterData.length > 0) {
						const enrolledSemesters = semesterData.filter(
							(semester) => semester.enrolled === true
						);
						setSemesterData(enrolledSemesters);
					}
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchSemestersAndUser();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	console.log('Semester Data:', semesterData);
	console.log('Enrolled Course IDs:', enrolledCourseIds);

	return (
		<div className="text-text-g flex flex-col gap-16">
			<Navbar2 />
			<div className="flex flex-col gap-12 mx-28">
				<div>
					<ContinueCard />
				</div>
				<div className="flex flex-col gap-8">
					<h2 className="font-body text-3xl font-bold">Semesters</h2>
					<div className="flex flex-col gap-4">
						{semesterData.map((semester, index) => {
							const courses = Array.isArray(semester.courses)
								? semester.courses
								: [];
							const enrolledCourses = courses.filter((course) => {
								if (course && course._id) {
									return enrolledCourseIds.includes(course._id.toString());
								}
								return false;
							});
							console.log(`Semester: ${semester.name}, Courses:`, courses);
							console.log(
								`Semester: ${semester.name}, Enrolled Courses:`,
								enrolledCourses
							);
							return (
								<SemesterCard
									key={index}
									content={semester.name}
									courses={enrolledCourses}
									index={index}
								/>
							);
						})}
					</div>
				</div>
				<PracticeTest />
			</div>
			<Footer />
		</div>
	);
};

export default Semester;
