import basicsOfBanking from '../assets/Images/landing page/course/basics-of-banking.png';
import understandingMoney from '../assets/Images/landing page/course/Basics-of-budget-2.png';
import basicsOfFinLiteracy from '../assets/Images/landing page/course/basicsOfFinLiteracy.png';

export const pageContent = {
	heading: 'Welcome to Money Management',
	description:
		'Learn how to manage your money effectively with our resources and guides.',
	points: [
		'Track your expenses.',
		'Set achievable financial goals.',
		'Invest wisely.',
	],
	sections: [
		{
			sectionHeading: 'Video Guides',
			videos: [
				{
					title: 'Budgeting Basics',
					description: "A beginner's guide to budgeting.",
					videoUrl: 'https://example.com/video1',
				},
				{
					title: 'Investing 101',
					description: 'Learn the basics of investing.',
					videoUrl: 'https://example.com/video2',
				},
			],
		},
	],
};

export const courses = [
	{
		slug: 'basics-of-banking',
		title: 'Basics of Banking',
		img: basicsOfBanking,
		description: [
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.',
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.',
		],
		modules: [
			{
				title: 'Understanding Needs and Wants',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Needs vs wants in different situations',
						videoSrc:
							'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
					},
					{
						title: 'Needs and wants in everyday life',
						videoSrc:
							'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
					},
					{
						title: 'Prioritizing needs over wants',
						videoSrc:
							'https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM',
					},
				],
			},
			{
				title: 'Spending Choices',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Needs vs Wants in different situations',
						videoSrc:
							'https://youtube.com/embed/cAkMcPfY_Ns?si=L0n9Sanryc576JxS',
					},
					{
						title: 'Needs and Wants in everyday life',
						videoSrc:
							'https://youtube.com/embed/M9O5AjEFzKw?si=Qx7Mlrllj0iM08hu',
					},
					{
						title: 'Prioritizing needs over wants',
						videoSrc:
							'https://youtube.com/embed/rAejJBmo55Y?si=6jh4W-o8ODHOH7BP',
					},
				],
			},
			{
				title: 'Understanding Financial Systems',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Banking systems overview',
						videoSrc:
							'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
					},
					{
						title: 'Digital payment ecosystems',
						videoSrc:
							'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
					},
					{
						title: 'Financial institution roles',
						videoSrc:
							'https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM',
					},
				],
			},
		],
		relatedCourses: [
			{ title: 'Basics of Banking', img: basicsOfBanking },
			{ title: 'Understanding Money', img: understandingMoney },
			{ title: 'Basics of Budget', img: understandingMoney }, // Assuming correct image import
		],
	},
	{
		slug: 'basics-of-financial-literacy',
		title: 'Basics of Financial Literacy',
		img: basicsOfFinLiteracy,
		description: [
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.',
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.',
		],
		modules: [
			{
				title: 'Understanding Needs and Wants',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Needs vs wants in different situations',
						videoSrc:
							'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
					},
					{
						title: 'Needs and wants in everyday life',
						videoSrc:
							'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
					},
					{
						title: 'Prioritizing needs over wants',
						videoSrc:
							'https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM',
					},
				],
			},
			{
				title: 'Spending Choices',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Needs vs Wants in different situations',
						videoSrc:
							'https://youtube.com/embed/cAkMcPfY_Ns?si=L0n9Sanryc576JxS',
					},
					{
						title: 'Needs and Wants in everyday life',
						videoSrc:
							'https://youtube.com/embed/M9O5AjEFzKw?si=Qx7Mlrllj0iM08hu',
					},
					{
						title: 'Prioritizing needs over wants',
						videoSrc:
							'https://youtube.com/embed/rAejJBmo55Y?si=6jh4W-o8ODHOH7BP',
					},
				],
			},
			{
				title: 'Understanding Financial Systems',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Banking systems overview',
						videoSrc:
							'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
					},
					{
						title: 'Digital payment ecosystems',
						videoSrc:
							'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
					},
					{
						title: 'Financial institution roles',
						videoSrc:
							'https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM',
					},
				],
			},
		],
		relatedCourses: [
			{ title: 'Basics of Banking', img: basicsOfBanking },
			{ title: 'Understanding Money', img: understandingMoney },
			{ title: 'Basics of Budget', img: understandingMoney }, // Assuming correct image import
		],
	},
	{
		slug: 'understanding-money',
		title: 'Understanding Money',
		img: understandingMoney,
		description: [
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.',
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.',
		],
		modules: [
			{
				title: 'Understanding Needs and Wants',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Needs vs wants in different situations',
						videoSrc:
							'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
					},
					{
						title: 'Needs and wants in everyday life',
						videoSrc:
							'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
					},
					{
						title: 'Prioritizing needs over wants',
						videoSrc:
							'https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM',
					},
				],
			},
			{
				title: 'Spending Choices',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Needs vs Wants in different situations',
						videoSrc:
							'https://youtube.com/embed/cAkMcPfY_Ns?si=L0n9Sanryc576JxS',
					},
					{
						title: 'Needs and Wants in everyday life',
						videoSrc:
							'https://youtube.com/embed/M9O5AjEFzKw?si=Qx7Mlrllj0iM08hu',
					},
					{
						title: 'Prioritizing needs over wants',
						videoSrc:
							'https://youtube.com/embed/rAejJBmo55Y?si=6jh4W-o8ODHOH7BP',
					},
				],
			},
			{
				title: 'Understanding Financial Systems',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Banking systems overview',
						videoSrc:
							'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
					},
					{
						title: 'Digital payment ecosystems',
						videoSrc:
							'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
					},
					{
						title: 'Financial institution roles',
						videoSrc:
							'https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM',
					},
				],
			},
		],
		relatedCourses: [
			{ title: 'Basics of Banking', img: basicsOfBanking },
			{ title: 'Understanding Money', img: understandingMoney },
			{ title: 'Basics of Budget', img: understandingMoney }, // Assuming correct image import
		],
	},
	{
		slug: 'basics-of-budget',
		title: 'Basics of Budget',
		img: understandingMoney,
		description: [
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.',
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, nesciunt architecto recusandae nemo mollitia quasi a modi ipsum dolor molestias quas eos quidem reprehenderit, porro tenetur harum doloremque consectetur beatae.',
		],
		modules: [
			{
				title: 'Understanding Needs and Wants',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Needs vs wants in different situations',
						videoSrc:
							'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
					},
					{
						title: 'Needs and wants in everyday life',
						videoSrc:
							'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
					},
					{
						title: 'Prioritizing needs over wants',
						videoSrc:
							'https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM',
					},
				],
			},
			{
				title: 'Spending Choices',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Needs vs Wants in different situations',
						videoSrc:
							'https://youtube.com/embed/cAkMcPfY_Ns?si=L0n9Sanryc576JxS',
					},
					{
						title: 'Needs and Wants in everyday life',
						videoSrc:
							'https://youtube.com/embed/M9O5AjEFzKw?si=Qx7Mlrllj0iM08hu',
					},
					{
						title: 'Prioritizing needs over wants',
						videoSrc:
							'https://youtube.com/embed/rAejJBmo55Y?si=6jh4W-o8ODHOH7BP',
					},
				],
			},
			{
				title: 'Understanding Financial Systems',
				description:
					'This module explores the concept of money, its history, and its different forms, including cash, digital payments, and cards. Students will learn about the functions of money, how it differs from currency, and why it holds value in society.',
				topics: [
					{
						title: 'Banking systems overview',
						videoSrc:
							'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
					},
					{
						title: 'Digital payment ecosystems',
						videoSrc:
							'https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6',
					},
					{
						title: 'Financial institution roles',
						videoSrc:
							'https://youtube.com/embed/DXYY2GMvq8s?si=2WZv1SRsLX5OmgoM',
					},
				],
			},
		],
		relatedCourses: [
			{ title: 'Basics of Banking', img: basicsOfBanking },
			{ title: 'Understanding Money', img: understandingMoney },
			{ title: 'Basics of Budget', img: understandingMoney }, // Assuming correct image import
		],
	},
];
