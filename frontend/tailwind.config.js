/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Dela Gothic One", "sans-serif"], // Add your custom font
        body: ["Outfit", "sans-serif"],
      },
      colors: {
        "bg-color": "#0c0a31",
        "primary_p": "#28114c", // purple
        "primary-fp": "#362856", // faded purple
        "primary-b": "#1d194f", // blueish purple 1
        "secondary-lt": "#ACA6FF", // lightest
        "secondary-l": "#A990FA", // light
        "secondary-d": "#B181FC", // dark
        "secondary-dt": "#8A72E9", // darkest
        "text-d": "#02020a", // dark
        "text-g": "#d4cfdb", // gray
        "tertiary-o": "#FA7B4D", // orange
        "tertiary-g": "#34B77A", // green
        "tertiary-p": "#FF17AB", // pink
        "tertiary-y": "#F7FF82", // yellow
        "tertiary-b": "#1C77B5", // sky-blue
      },
      backgroundImage: {
        "Menu-open": "url(./src/assets/Images/landing page/Exclude4x.png)",
        "Hero": "url(./src/assets/Images/Landing Page/hero img.png)",
        "Menu":"url(./src/assets/Images/Navbar.svg)",
        'money-gradient':
          'linear-gradient(180deg, rgba(12,10,49,0) 0%, rgba(12,10,49,0.4) 3%, rgba(12,10,49,0.6) 5%, rgba(12,10,49,0.8) 10%, rgba(12,10,49,1) 20%)',
      },
    },
  },
  plugins: [],
};
