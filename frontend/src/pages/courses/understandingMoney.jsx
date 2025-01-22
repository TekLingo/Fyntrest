// import React from "react";
// import Navbar from "../../components/Navbar";
// import { GoHome } from "react-icons/go";
// import Footer from "../../components/Footer";
// import { FaChevronRight } from "react-icons/fa6";
// import basicImg from "../../assets/Images/landing page/course/basicsOfFinLiteracy.png";

// const Money = () => {
//   return (
//     <div className="">
//       <Navbar />
//       <div className="p-4 px-16 text-text-g">
//         {/* Breadcrumb Navigation */}
//         <div className="flex flex-row items-center justify-start gap-2">
//           <div>
//             <GoHome color="white" className="w-6 h-auto" />
//           </div>
//           <div className="">
//             {/* <FaChevronRight color="white" /> */}
//             <p>{">"}</p>
//           </div>
//           <div className="">
//             <p>Course</p>
//           </div>
//           <div className="">
//             {/* <FaChevronRight color="white" /> */}
//             <p>{">"}</p>
//           </div>
//           <div className="font-bold">
//             <p>Basics of Financial Litracy</p>
//           </div>
//         </div>
//         {/* Heading Section */}
//         <div className="w-full py-10">
//           <div className="flex col-span-2 items-center justify-around">
//             <div className="max-w-[45%]">
//               <div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
//                 <h1>Basics of Financial Litracy</h1>
//               </div>
//               <div>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                   Totam, nesciunt architecto recusandae nemo mollitia quasi a
//                   modi ipsum dolor molestias quas eos quidem reprehenderit,
//                   porro tenetur harum doloremque consectetur beatae.
//                 </p>
//               </div>
//               <div className="py-4">
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                   Totam, nesciunt architecto recusandae nemo mollitia quasi a
//                   modi ipsum dolor molestias quas eos quidem reprehenderit,
//                   porro tenetur harum doloremque consectetur beatae.
//                 </p>
//               </div>
//             </div>
//             <div className="">
//               <img src={basicImg} className="w-80 h-auto" alt="/" />
//             </div>
//           </div>
//         </div>
//         {/* Course content */}
//         <div className="py-4">
//           <div className="mb-12">
//             <h2 className="text-4xl font-body font-bold">Glimpse of Course</h2>
//           </div>
//           <div className="flex flex-col gap-4">
//             <div className="bg-primary_p h-16 w-full p-4 flex items-center text-lg rounded-xl justify-between cursor-pointer">
//               <div>
//                 <p>Understanding Needs and Wants</p>
//               </div>
//               <div>
//                 <FaChevronRight />
//               </div>
//             </div>
//             <div className="bg-primary_p h-16 w-full p-4 flex items-center text-lg rounded-xl justify-between cursor-pointer">
//               <div>
//                 <p>Spending Choices</p>
//               </div>
//               <div>
//                 <FaChevronRight />
//               </div>
//             </div>
//             <div className="bg-primary_p h-16 w-full p-4 flex items-center text-lg rounded-xl justify-between cursor-pointer">
//               <div>
//                 <p>Spending Choices</p>
//               </div>
//               <div>
//                 <FaChevronRight />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Money;

// import React, { useState } from "react";
// import Navbar from "../../components/Navbar";
// import { GoHome } from "react-icons/go";
// import Footer from "../../components/Footer";
// import { FaChevronRight } from "react-icons/fa6";
// import basicImg from "../../assets/Images/landing page/course/basicsOfFinLiteracy.png";
// import UnlockCard from "../../components/Cards/UnlockCard";

// const Money = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const courseContents = [
//     "Understanding Needs and Wants",
//     "Spending Choices",
//     "Budgeting Basics",
//   ];

//   return (
//     <div className="">
//       <Navbar />
//       <div className="p-4 px-16 text-text-g">
//         {/* Breadcrumb Navigation */}
//         <div className="flex flex-row items-center justify-start gap-2">
//           <div>
//             <GoHome color="white" className="w-6 h-auto" />
//           </div>
//           <div className="">
//             <p>{">"}</p>
//           </div>
//           <div className="">
//             <p>Course</p>
//           </div>
//           <div className="">
//             <p>{">"}</p>
//           </div>
//           <div className="font-bold">
//             <p>Basics of Financial Literacy</p>
//           </div>
//         </div>
//         {/* Heading Section */}
//         <div className="w-full py-10">
//           <div className="flex col-span-2 items-center justify-around">
//             <div className="max-w-[45%]">
//               <div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
//                 <h1>Basics of Financial Literacy</h1>
//               </div>
//               <div>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                   Totam, nesciunt architecto recusandae nemo mollitia quasi a
//                   modi ipsum dolor molestias quas eos quidem reprehenderit,
//                   porro tenetur harum doloremque consectetur beatae.
//                 </p>
//               </div>
//               <div className="py-4">
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                   Totam, nesciunt architecto recusandae nemo mollitia quasi a
//                   modi ipsum dolor molestias quas eos quidem reprehenderit,
//                   porro tenetur harum doloremque consectetur beatae.
//                 </p>
//               </div>
//             </div>
//             <div className="">
//               <img src={basicImg} className="w-80 h-auto" alt="/" />
//             </div>
//           </div>
//         </div>
//         {/* Course content */}
//         <div className="py-4">
//           <div className="mb-12">
//             <h2 className="text-4xl font-body font-bold">Glimpse of Course</h2>
//           </div>
//           <div className="flex flex-col gap-4">
//             {courseContents.map((content, index) => (
//               <UnlockCard
//                 key={index}
//                 content={content}
//                 index={index}
//                 isLoggedIn={isLoggedIn}
//               />
//             ))}
//           </div>
//           {!isLoggedIn && (
//             <button
//               onClick={() => setIsLoggedIn(true)}
//               className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
//             >
//               Login to Unlock
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Money;

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { GoHome } from "react-icons/go";
import Footer from "../../components/Footer";
import { FaChevronRight } from "react-icons/fa6";
import basicImg from "../../assets/Images/landing page/course/basicsOfFinLiteracy.png";
import UnlockCard from "../../components/Cards/UnlockCard";

const Money = () => {
  const courseContents = [
    "Understanding Needs and Wants",
    "Spending Choices",
    "Budgeting Basics",
    "Investment Tips",
  ];

  return (
    <div className="">
      <Navbar />
      <div className="p-4 px-16 text-text-g">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-row items-center justify-start gap-2">
          <div>
            <GoHome color="white" className="w-6 h-auto" />
          </div>
          <div className="">
            <p>{">"}</p>
          </div>
          <div className="">
            <p>Course</p>
          </div>
          <div className="">
            <p>{">"}</p>
          </div>
          <div className="font-bold">
            <p>Basics of Financial Literacy</p>
          </div>
        </div>
        {/* Heading Section */}
        <div className="w-full py-10">
          <div className="flex col-span-2 items-center justify-around">
            <div className="max-w-[45%]">
              <div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
                <h1>Basics of Financial Literacy</h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Totam, nesciunt architecto recusandae nemo mollitia quasi a
                  modi ipsum dolor molestias quas eos quidem reprehenderit,
                  porro tenetur harum doloremque consectetur beatae.
                </p>
              </div>
              <div className="py-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Totam, nesciunt architecto recusandae nemo mollitia quasi a
                  modi ipsum dolor molestias quas eos quidem reprehenderit,
                  porro tenetur harum doloremque consectetur beatae.
                </p>
              </div>
            </div>
            <div className="">
              <img src={basicImg} className="w-80 h-auto" alt="/" />
            </div>
          </div>
        </div>
        {/* Course content */}
        <div className="py-4">
          <div className="mb-12">
            <h2 className="text-4xl font-body font-bold">Glimpse of Course</h2>
          </div>
          <div className="flex flex-col gap-4 z-1 relative">
            {courseContents.map((content, index) => (
              <UnlockCard key={index} content={content} index={index} />
            ))}
            <div className="bg-text-g w-full h-80 z-2 absolute flex items-end justify-center p-4">
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
                Login to Unlock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Money;

// import React, { useState } from "react";
// import Navbar from "../../components/Navbar";
// import { GoHome } from "react-icons/go";
// import Footer from "../../components/Footer";
// import basicImg from "../../assets/Images/landing page/course/basicsOfFinLiteracy.png";
// import UnlockCard from "../../components/Cards/UnlockCard";

// const Money = () => {
//   const courseContents = [
//     "Understanding Needs and Wants",
//     "Spending Choices",
//     "Budgeting Basics",
//     "Investment Tips",
//   ];

//   const isLoggedIn = false; // Mock login state

//   return (
//     <div className="">
//       <Navbar />
//       <div className="p-4 px-16 text-text-g">
//         {/* Breadcrumb Navigation */}
//         <div className="flex flex-row items-center justify-start gap-2">
//           <div>
//             <GoHome color="white" className="w-6 h-auto" />
//           </div>
//           <div className="">
//             <p>{">"}</p>
//           </div>
//           <div className="">
//             <p>Course</p>
//           </div>
//           <div className="">
//             <p>{">"}</p>
//           </div>
//           <div className="font-bold">
//             <p>Basics of Financial Literacy</p>
//           </div>
//         </div>
//         {/* Heading Section */}
//         <div className="w-full py-10">
//           <div className="flex col-span-2 items-center justify-around">
//             <div className="max-w-[45%]">
//               <div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
//                 <h1>Basics of Financial Literacy</h1>
//               </div>
//               <div>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                   Totam, nesciunt architecto recusandae nemo mollitia quasi a
//                   modi ipsum dolor molestias quas eos quidem reprehenderit,
//                   porro tenetur harum doloremque consectetur beatae.
//                 </p>
//               </div>
//               <div className="py-4">
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                   Totam, nesciunt architecto recusandae nemo mollitia quasi a
//                   modi ipsum dolor molestias quas eos quidem reprehenderit,
//                   porro tenetur harum doloremque consectetur beatae.
//                 </p>
//               </div>
//             </div>
//             <div className="">
//               <img src={basicImg} className="w-80 h-auto" alt="/" />
//             </div>
//           </div>
//         </div>
//         {/* Course content */}
//         <div className="py-4">
//           <div className="mb-12">
//             <h2 className="text-4xl font-body font-bold">Glimpse of Course</h2>
//           </div>
//           <div className="flex flex-col gap-4 z-1 relative">
//             {courseContents.map((content, index) => (
//               <UnlockCard
//                 key={index}
//                 content={content}
//                 index={index}
//                 isLoggedIn={isLoggedIn}
//               />
//             ))}
//             <div className="bg-text-g w-full h-80 z-2 absolute flex items-end justify-center p-4">
//               <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
//                 Login to Unlock
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Money;
