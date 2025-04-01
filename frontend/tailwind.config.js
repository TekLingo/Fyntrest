/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				title: ['Dela Gothic One', 'sans-serif'], // Add your custom font
				body: ['Outfit', 'sans-serif'],
			},
			boxShadow: {
				custom: '0.8rem 0.8rem 0px #34B77A',
				custom2: '-0.8rem 0.8rem 0px #FAC64D',
			},
			colors: {
				'bg-color': '#0c0a31',
				primary_p: '#28114c', // purple
				'primary-fp': '#473966', // faded purple
				'primary-b': '#1d194f', // blueish purple 1
				'secondary-lt': '#ACA6FF', // lightest
				'secondary-l': '#A990FA', // light
				'secondary-d': '#B181FC', // dark
				'secondary-dt': '#8A72E9', // darkest
				'text-d': '#02020a', // dark
				'text-g': '#d4cfdb', // gray
				'tertiary-o': '#FA7B4D', // orange
				'tertiary-g': '#34B77A', // green
				'tertiary-p': '#FF17AB', // pink
				'tertiary-y': '#F7FF82', // yellow
				'tertiary-b': '#1C77B5', // sky-blue
			},
			backgroundImage: {
				'Menu-open': 'url(./src/assets/Images/landing page/Exclude4x.png)',
				'Hero': 'url(./src/assets/Images/Landing Page/hero-img.png)',
				'Menu': 'url(.//assets/Images/navbar.svg)',
				'money-gradient':
					'linear-gradient(180deg, rgba(12,10,49,0) 0%, rgba(12,10,49,0.4) 3%, rgba(12,10,49,0.6) 5%, rgba(12,10,49,0.8) 10%, rgba(12,10,49,1) 20%)',
				'journey-path':
					'url(../src/assets/Images/Landing page/after-login/path.png)',
			},
			animation: {
				'bounce-slow': 'bounce-slow 3s infinite',
				float: 'float 6s infinite',
				'float-delayed': 'float 6s infinite 1.5s',
			},
			keyframes: {
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
			},
		},
	},
	plugins: [],
};
