// import React, { useState } from "react";

// const UnlockCard = ({ content, index, isLoggedIn }) => {
//   return (
//     <div
//       className={`relative bg-primary_p h-16 w-full p-4 flex items-center text-lg rounded-xl justify-between cursor-pointer ${
//         index > 1 && !isLoggedIn ? "overflow-hidden blur-sm" : ""
//       }`}
//       style={{
//         maskImage:
//           index > 1 && !isLoggedIn
//             ? "linear-gradient(to bottom, black, transparent)"
//             : "none",
//         WebkitMaskImage:
//           index > 1 && !isLoggedIn
//             ? "linear-gradient(to bottom, black, transparent)"
//             : "none",
//       }}
//     >
//       <div>
//         <p>{content}</p>
//       </div>
//     </div>
//   );
// };

// export default UnlockCard;

// 2ND WORKS
// import React from "react";

// const UnlockCard = ({ content, index, isLoggedIn }) => {
//   const showFade = index >= 1 && !isLoggedIn;

//   return (
//     <div className="bg-primary_p h-16 w-full p-4 flex items-center text-lg rounded-xl justify-between cursor-pointer" >
//       <div>
//         <p>{content}</p>
//       </div>
//     </div>
//   );
// };

// export default UnlockCard;

import React from "react";

const UnlockCard = ({ content, index, isLoggedIn }) => {
  const showFade = index >= 1 && !isLoggedIn;

  return (
    <div className="relative">
      <div
        className={`bg-primary_p h-16 w-full p-4 flex items-center text-lg rounded-xl justify-between cursor-pointer`}
      >
        <p>{content}</p>
      </div>
      {showFade && (
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1) 5%, rgba(255, 255, 255, 0) 20%)",
          }}
        ></div>
      )}
    </div>
  );
};

export default UnlockCard;
