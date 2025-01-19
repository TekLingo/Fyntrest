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

import React, { useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";

const Hamburger = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-40 bg-Menu-open bg-contain bg-no-repeat">
      <div className=""></div>
    </div>
  );
};

export default Hamburger;
