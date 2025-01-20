// import React, { useState } from "react";
// import { IoIosClose, IoIosMenu } from "react-icons/io";
// import MenuOpen from "../assets/Images/landing page/Exclude.png";

// const Hamburger = () => {
//   const [nav, setNav] = useState(false);

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   return (
//     <div>
//       <div className="bg-white hidden h-40">hi</div>
//       <div onClick={handleNav} className="block">
//         {nav ? (
//           <IoIosClose
//             size={40}
//             color="#d4cfdb"
//             className="hover:cursor-pointer"
//           />
//         ) : (
//           <IoIosMenu
//             size={40}
//             color="#d4cfdb"
//             className="hover:cursor-pointer"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Hamburger;

import React, { useState } from 'react';
import { IoIosClose, IoIosMenu } from 'react-icons/io';

const Hamburger = () => {
	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<div className="absolute  w-full h-96">
			<div className="relative ">
				<svg
					className="absolute top-0 left-0 w-full"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
				>
					<path
						fill="#362856"
						d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,133.3C672,128,768,160,864,181.3C960,203,1056,213,1152,186.7C1248,160,1344,96,1392,64L1440,32L1440,0L0,0Z"
					></path>
				</svg>
				<div className="h-96 bg-transparent"></div>
			</div>
		</div>
	);
};

export default Hamburger;
