import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CompleteImg from '../../assets/Images/hooray.png';
import axiosInstance from '../../utils/axiosInstance';

const Quiz = () => {
	const { videoId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { moduleId, currentVideoId } = location.state || {}; // Get moduleId and currentVideoId from navigation state
	const [quizData, setQuizData] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [progressStatus, setProgressStatus] = useState([]);
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [coins, setCoins] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [moduleData, setModuleData] = useState(null); // Store module data to find next video

	// Fetch quizzes for the video
	useEffect(() => {
		const fetchQuizzes = async () => {
			if (!videoId) {
				setError('Invalid video ID.');
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const response = await axiosInstance.get(`/quizzes?videoId=${videoId}`);
				if (response.status === 200 && response.data.success) {
					const quizzes = response.data.quizzes;
					if (quizzes.length === 0) {
						setError('No quizzes available for this video.');
					} else if (quizzes[0].questions.length === 0) {
						setError('No questions available for this quiz.');
					} else {
						setQuizData(quizzes[0].questions);
						setSelectedAnswers(Array(quizzes[0].questions.length).fill(null));
						setProgressStatus(Array(quizzes[0].questions.length).fill(null));
					}
				} else {
					setError(response.data.message || 'Failed to fetch quiz data.');
				}
			} catch (error) {
				console.error('Error fetching quizzes:', error);
				setError('An error occurred while fetching the quiz.');
			} finally {
				setLoading(false);
			}
		};

		fetchQuizzes();
	}, [videoId]);

	// Fetch module data to determine the next video
	useEffect(() => {
		const fetchModuleData = async () => {
			if (!moduleId) return;
			try {
				const response = await axiosInstance.get(`/modules/${moduleId}`);
				if (response.status === 200 && response.data.success) {
					setModuleData(response.data.data);
				}
			} catch (error) {
				console.error('Error fetching module data:', error);
			}
		};

		fetchModuleData();
	}, [moduleId]);

	const handleAnswerClick = (index) => {
		if (selectedAnswers[currentQuestion] === null) {
			const updatedAnswers = [...selectedAnswers];
			updatedAnswers[currentQuestion] = index;
			setSelectedAnswers(updatedAnswers);

			const updatedProgress = [...progressStatus];
			if (
				quizData[currentQuestion].options[index] ===
				quizData[currentQuestion].answer
			) {
				updatedProgress[currentQuestion] = 'correct';
				setCoins((prev) => prev + 10);
			} else {
				updatedProgress[currentQuestion] = 'incorrect';
				setCoins((prev) => Math.max(0, prev - 5));
			}
			setProgressStatus(updatedProgress);
		}
	};

	const handleNext = () => {
		if (selectedAnswers[currentQuestion] === null) {
			alert('Please select an answer before proceeding.');
			return;
		}
		if (currentQuestion < quizData.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			setQuizCompleted(true);
		}
	};

	const handlePrevious = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1);
		}
	};

	const restartQuiz = () => {
		setCurrentQuestion(0);
		setSelectedAnswers(Array(quizData.length).fill(null));
		setProgressStatus(Array(quizData.length).fill(null));
		setQuizCompleted(false);
		setCoins(0);
	};

	const handleContinueLearning = () => {
		if (!moduleData || !moduleData.videos || !currentVideoId) {
			navigate(`/logged/module/${moduleId}`); // Fallback to module page
			return;
		}

		const currentIndex = moduleData.videos.findIndex(
			(v) => v._id === currentVideoId
		);
		if (currentIndex !== -1 && currentIndex + 1 < moduleData.videos.length) {
			const nextVideoId = moduleData.videos[currentIndex + 1]._id;
			navigate(`/logged/module/${moduleId}/video/${nextVideoId}`);
		} else {
			navigate(`/logged/module/${moduleId}`); // Go back to module if no next video
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				Loading quiz...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center h-screen text-text-g p-4">
				<p>{error}</p>
				<button
					className="mt-4 bg-secondary-dt px-6 py-2 rounded-lg"
					onClick={() => navigate(-1)}
				>
					Go Back
				</button>
			</div>
		);
	}

	if (quizCompleted) {
		return (
			<div className="flex flex-col items-center justify-center text-text-g p-4 h-screen gap-8">
				<FaArrowLeft
					className="flex place-self-start h-6 w-auto md:ml-10 cursor-pointer"
					onClick={() => navigate(-1)}
				/>
				<h1 className="text-3xl font-bold font-title">Quiz Complete</h1>
				<p className="text-lg mt-2 font-body">
					YAYYY!! You just crushed that quiz! Keep going and build your
					financial superpowers!
				</p>
				<img src={CompleteImg} alt="Completion" className="w-60 h-60 my-5" />
				<p className="text-xl font-body">{coins} coins earned!!</p>
				<div className="flex gap-4 mt-5 font-body">
					<button
						className="px-6 py-2 rounded-lg border-secondary-dt border-2"
						onClick={restartQuiz}
					>
						Retry Quiz
					</button>
					<button
						className="bg-secondary-dt px-6 py-2 rounded-lg"
						onClick={handleContinueLearning} // Updated to use new handler
					>
						Continue Learning
					</button>
				</div>
			</div>
		);
	}

	if (quizData.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-screen text-text-g p-4">
				<p>No questions available for this quiz.</p>
				<button
					className="mt-4 bg-secondary-dt px-6 py-2 rounded-lg"
					onClick={() => navigate(-1)}
				>
					Go Back
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center text-text-g p-4 h-screen">
			<FaArrowLeft
				className="flex place-self-start h-6 w-auto md:ml-10 cursor-pointer"
				onClick={() => navigate(-1)}
			/>
			<button
				onClick={handlePrevious}
				className="absolute left-10 text-3xl text-text-g disabled:opacity-50"
				disabled={currentQuestion === 0}
			>
				<FaAngleLeft />
			</button>
			<div className="w-full max-w-2xl flex flex-col gap-10">
				<h1 className="text-2xl text-center font-title">
					{currentQuestion + 1}. {quizData[currentQuestion]?.question}
				</h1>
				<div className="space-y-3">
					{quizData[currentQuestion]?.options.map((option, index) => (
						<button
							key={index}
							onClick={() => handleAnswerClick(index)}
							className={`w-full p-3 rounded-lg text-left font-medium transition-colors ${
								selectedAnswers[currentQuestion] !== null
									? option === quizData[currentQuestion].answer
										? 'bg-green-500'
										: selectedAnswers[currentQuestion] === index
										? 'bg-red-500'
										: 'bg-[#1a1535]'
									: 'bg-[#1a1535] hover:bg-[#322d5f]'
							}`}
							disabled={selectedAnswers[currentQuestion] !== null}
						>
							{option}
						</button>
					))}
				</div>
				<div className="w-full h-2 bg-secondary-lt flex">
					{progressStatus.map((status, index) => (
						<div
							key={index}
							className={`h-full transition-all ${
								status === 'correct'
									? 'bg-green-500'
									: status === 'incorrect'
									? 'bg-red-500'
									: 'bg-secondary-lt'
							}`}
							style={{ width: `${100 / quizData.length}%` }}
						/>
					))}
				</div>
			</div>
			<button
				onClick={handleNext}
				className="absolute right-10 text-3xl text-text-g"
			>
				<FaAngleRight />
			</button>
		</div>
	);
};

export default Quiz;
