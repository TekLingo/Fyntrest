import React from 'react';

// Import images
import completed from '../../assets/Images/landing page/after-login/completed.png';
import end from '../../assets/Images/landing page/after-login/end-journey.png';
import locked from '../../assets/Images/landing page/after-login/locked.png';
import journeyPath from '../../assets/Images/landing page/after-login/path.png';
import unlocked from '../../assets/Images/landing page/after-login/unlocked.png';
import banking from '../../assets/Images/landing page/course/basics-of-banking.png';
import budget from '../../assets/Images/landing page/course/Basics-of-budget-2.png';
import financialLiteracy from '../../assets/Images/landing page/course/basicsOfFinLiteracy.png';
import earnMoney from '../../assets/Images/landing page/course/Earn.png';
import understandingMoney from '../../assets/Images/landing page/course/money.png';
import manage from '../../assets/Images/landing page/course/Needs.png';
import saving from '../../assets/Images/landing page/course/Save.png';

const statusImages = {
	completed,
	locked,
	unlocked,
};

const courses = [
	{
		id: 1,
		title: 'Understanding Money',
		image: understandingMoney,
		modules: [{ status: 'completed', title: 'Concept of Money' }],
	},
	{
		id: 2,
		title: 'Basics of Financial Literacy',
		image: financialLiteracy,
		modules: [
			{ status: 'unlocked', title: 'Understanding needs and wants' },
			{ status: 'locked', title: 'Spending choices' },
			{ status: 'locked', title: 'Decision making with money' },
			{ status: 'locked', title: 'Setting priorities' },
			{ status: 'locked', title: 'Understanding value' },
			{ status: 'locked', title: 'Setting financial goals' },
			{ status: 'locked', title: 'Introduction to money management' },
			{ status: 'locked', title: 'Financial responsibility' },
			{ status: 'locked', title: 'Recognizing emotions and spending' },
			{ status: 'locked', title: 'Saving vs Spending' },
		],
	},
	{
		id: 3,
		title: 'Earning Money',
		image: earnMoney,
		modules: [
			{ status: 'locked', title: 'Different ways to earn money' },
			{ status: 'locked', title: 'Introduction to skills for earning' },
		],
	},
	{
		id: 4,
		title: 'Saving Money',
		image: saving,
		modules: [
			{ status: 'locked', title: 'Why saving is important' },
			{ status: 'locked', title: 'How to save money' },
			{ status: 'locked', title: 'Simple saving tips' },
		],
	},
	{
		id: 5,
		title: 'Basic of banking',
		image: banking,
		modules: [
			{ status: 'locked', title: 'Introduction to banking and their role' },
			{ status: 'locked', title: 'Managing bank account' },
			{ status: 'locked', title: 'Banking Safety' },
		],
	},
	{
		id: 6,
		title: 'Budgeting Basics',
		image: budget,
		modules: [
			{ status: 'locked', title: 'Creating a budget' },
			{ status: 'locked', title: 'Understanding income vs expenses' },
		],
	},
	{
		id: 7,
		title: 'Managing money wisely',
		image: manage,
		modules: [
			{ status: 'locked', title: 'Saving and investing' },
			{ status: 'locked', title: 'Spending vs Saving' },
		],
	},
];

const Journey = () => {
	return (
		<div className="my-40">
			<div className="mx-[5%] border-4 rounded-3xl flex flex-col justify-center items-center gap-20 p-[5%] text-text-g border-secondary-lt shadow-lg">
				<h1 className="font-title text-3xl">Your Journey</h1>
				<div className="relative w-full h-[1024px] overflow-scroll">
					{/* Scrollable background image */}
					<img
						src={journeyPath}
						alt="Journey Path"
						className="absolute top-20 left-12 object-cover m-8"
					/>
					<div className="relative z-10 flex flex-col gap-20">
						{courses.map((course) => (
							<div key={course.id} className="flex flex-col gap-28">
								{/* Course Header */}
								<div className="flex items-center gap-12">
									<div className="w-[124px]">
										<img src={course.image} alt={course.title} />
									</div>
									<div className="text-2xl">
										<h3>Course {course.id}:</h3>
										<h1>{course.title}</h1>
									</div>
								</div>

								{/* Modules Grid */}
								<div className="mx-28 gap-x-16 gap-y-28 flex flex-wrap text-center">
									{course.modules.map((module, index) => (
										<div key={index} className="flex flex-col max-w-44 gap-2">
											<img
												src={statusImages[module.status]}
												alt={module.status}
											/>
											<h3 className="text-center">{module.title}</h3>
										</div>
									))}
								</div>
							</div>
						))}
						{/* End Journey */}
						<div className="flex items-center justify-end gap-4">
							<div className="w-[324px]">
								<img
									src={end}
									alt="Completed"
									className="w-[324px] h-[324px] object-contain"
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
