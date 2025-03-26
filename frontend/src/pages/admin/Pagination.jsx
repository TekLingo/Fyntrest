// import React, { useState } from "react";

// export default function Pagination() {
//   const [active, setActive] = useState(1);
//   const totalPages = 5;

//   const getItemProps = (index) => ({
//     className: `px-3 py-1 rounded-md transition ${
//       active === index ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
//     }`,
//     onClick: () => setActive(index),
//   });

//   const next = () => {
//     if (active < totalPages) setActive(active + 1);
//   };

//   const prev = () => {
//     if (active > 1) setActive(active - 1);
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     // First page always visible
//     pageNumbers.push(
//       <button key={1} {...getItemProps(1)}>
//         1
//       </button>
//     );

//     // Left dots if active > 3
//     if (active > 3) {
//       pageNumbers.push(<span key="dots-left">...</span>);
//     }

//     // Previous adjacent page
//     if (active > 2) {
//       pageNumbers.push(
//         <button key={active - 1} {...getItemProps(active - 1)}>
//           {active - 1}
//         </button>
//       );
//     }

//     // Active page
//     if (active !== 1 && active !== totalPages) {
//       pageNumbers.push(
//         <button key={active} {...getItemProps(active)}>
//           {active}
//         </button>
//       );
//     }

//     // Next adjacent page
//     if (active < totalPages - 1) {
//       pageNumbers.push(
//         <button key={active + 1} {...getItemProps(active + 1)}>
//           {active + 1}
//         </button>
//       );
//     }

//     // Right dots if active < totalPages - 2
//     if (active < totalPages - 2) {
//       pageNumbers.push(<span key="dots-right">...</span>);
//     }

//     // Last page always visible
//     pageNumbers.push(
//       <button key={totalPages} {...getItemProps(totalPages)}>
//         {totalPages}
//       </button>
//     );

//     return pageNumbers;
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <button
//         className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
//         onClick={prev}
//         disabled={active === 1}
//       >
//         &#8592;
//       </button>
//       <div className="flex items-center gap-2">{renderPageNumbers()}</div>
//       <button
//         className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
//         onClick={next}
//         disabled={active === totalPages}
//       >
//         &#8594;
//       </button>
//     </div>
//   );
// }

// import React, { useState } from "react";

// export default function Pagination() {
//   const [active, setActive] = useState(1);
//   const totalPages = 5;
//   const DOTS_THRESHOLD = 2; // Adjust this value to change when "..." appears

//   const getItemProps = (index) => ({
//     className: `px-3 py-1 rounded-md transition ${
//       active === index ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
//     }`,
//     onClick: () => setActive(index),
//   });

//   const next = () => {
//     if (active < totalPages) setActive(active + 1);
//   };

//   const prev = () => {
//     if (active > 1) setActive(active - 1);
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     // Always show first page
//     pageNumbers.push(
//       <button key={1} {...getItemProps(1)}>
//         1
//       </button>
//     );

//     // Left dots if needed
//     if (active > DOTS_THRESHOLD + 1) {
//       pageNumbers.push(<span key="dots-left" className="text-white">...</span>);
//     }

//     // Previous adjacent page
//     if (active > 2) {
//       pageNumbers.push(
//         <button key={active - 1} {...getItemProps(active - 1)}>
//           {active - 1}
//         </button>
//       );
//     }

//     // Active page
//     if (active !== 1 && active !== totalPages) {
//       pageNumbers.push(
//         <button key={active} {...getItemProps(active)}>
//           {active}
//         </button>
//       );
//     }

//     // Next adjacent page
//     if (active < totalPages - 1) {
//       pageNumbers.push(
//         <button key={active + 1} {...getItemProps(active + 1)}>
//           {active + 1}
//         </button>
//       );
//     }

//     // Right dots if needed
//     if (active < totalPages - DOTS_THRESHOLD) {
//       pageNumbers.push(<span key="dots-right" className="text-white">...</span>);
//     }

//     // Always show last page
//     pageNumbers.push(
//       <button key={totalPages} {...getItemProps(totalPages)}>
//         {totalPages}
//       </button>
//     );

//     return pageNumbers;
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <button
//         className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
//         onClick={prev}
//         disabled={active === 1}
//       >
//         &#8592;
//       </button>
//       <div className="flex items-center gap-2">{renderPageNumbers()}</div>
//       <button
//         className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
//         onClick={next}
//         disabled={active === totalPages}
//       >
//         &#8594;
//       </button>
//     </div>
//   );
// }

// import React, { useState } from "react";

// export default function Pagination() {
//   const [active, setActive] = useState(1);
//   const totalPages = 5;
//   const DOTS_THRESHOLD = 2; // Adjust this value to change when "..." appears

//   const getItemProps = (index) => ({
//     className: `px-3 py-1 w-8 h-8 flex items-center justify-center rounded-md transition ${
//       active === index ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
//     }`,
//     onClick: () => setActive(index),
//   });

//   const next = () => {
//     if (active < totalPages) setActive(active + 1);
//   };

//   const prev = () => {
//     if (active > 1) setActive(active - 1);
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     // Always show first page
//     pageNumbers.push(
//       <button key={1} {...getItemProps(1)}>
//         1
//       </button>
//     );

//     // Left dots (always reserve space)
//     pageNumbers.push(
//       active > DOTS_THRESHOLD + 1 ? (
//         <span key="dots-left" className="w-8 h-8 flex items-center justify-center">...</span>
//       ) : (
//         <span key="empty-left" className="w-8 h-8"></span>
//       )
//     );

//     // Previous adjacent page
//     if (active > 2) {
//       pageNumbers.push(
//         <button key={active - 1} {...getItemProps(active - 1)}>
//           {active - 1}
//         </button>
//       );
//     } else {
//       pageNumbers.push(<span key="empty-prev" className="w-8 h-8"></span>);
//     }

//     // Active page
//     if (active !== 1 && active !== totalPages) {
//       pageNumbers.push(
//         <button key={active} {...getItemProps(active)}>
//           {active}
//         </button>
//       );
//     } else {
//       pageNumbers.push(<span key="empty-active" className="w-8 h-8"></span>);
//     }

//     // Next adjacent page
//     if (active < totalPages - 1) {
//       pageNumbers.push(
//         <button key={active + 1} {...getItemProps(active + 1)}>
//           {active + 1}
//         </button>
//       );
//     } else {
//       pageNumbers.push(<span key="empty-next" className="w-8 h-8"></span>);
//     }

//     // Right dots (always reserve space)
//     pageNumbers.push(
//       active < totalPages - DOTS_THRESHOLD ? (
//         <span key="dots-right" className="w-8 h-8 flex items-center justify-center">...</span>
//       ) : (
//         <span key="empty-right" className="w-8 h-8"></span>
//       )
//     );

//     // Always show last page
//     pageNumbers.push(
//       <button key={totalPages} {...getItemProps(totalPages)}>
//         {totalPages}
//       </button>
//     );

//     return pageNumbers;
//   };

//   return (
//     <div className="flex items-center gap-4 bg-gray-500">
//       <button
//         className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
//         onClick={prev}
//         disabled={active === 1}
//       >
//         &#8592;
//       </button>
//       <div className="flex items-center gap-2 min-w-[200px]">{renderPageNumbers()}</div>
//       <button
//         className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
//         onClick={next}
//         disabled={active === totalPages}
//       >
//         &#8594;
//       </button>
//     </div>
//   );
// }

// import React, { useState } from "react";

// export default function Pagination() {
//   const [active, setActive] = useState(1);
//   const totalPages = 5;
//   const MAX_VISIBLE_PAGES = 5; // Fixed number of displayed blocks

//   const getItemProps = (index) => ({
//     className: `px-3 py-1 w-8 h-8 flex items-center justify-center rounded-md transition text-text-g ${
//       active === index
//         ? "bg-secondary-lt text-white"
//         : "bg-secondary-d text-white"
//     }`,
//     onClick: () => setActive(index),
//   });

//   const next = () => {
//     if (active < totalPages) setActive(active + 1);
//   };

//   const prev = () => {
//     if (active > 1) setActive(active - 1);
//   };

//   const renderPageNumbers = () => {
//     let pages = new Set();

//     // Always show first page
//     pages.add(1);

//     // Always show last page
//     pages.add(totalPages);

//     // Show current page
//     pages.add(active);

//     // Show adjacent pages
//     if (active > 2) pages.add(active - 1);
//     if (active < totalPages - 1) pages.add(active + 1);

//     let pageArray = Array.from(pages).sort((a, b) => a - b);
//     let finalPages = [];

//     for (let i = 0; i < pageArray.length; i++) {
//       finalPages.push(
//         <button key={pageArray[i]} {...getItemProps(pageArray[i])}>
//           {pageArray[i]}
//         </button>
//       );

//       // Add dots when there's a gap in the sequence
//       if (i < pageArray.length - 1 && pageArray[i + 1] !== pageArray[i] + 1) {
//         finalPages.push(
//           <span
//             key={`dots-${i}`}
//             className=" w-8 h-8 text-4xl flex items-center justify-center text-text-g"
//           >
//             .
//           </span>
//         );
//       }
//     }

//     return finalPages;
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <button
//         className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
//         onClick={prev}
//         disabled={active === 1}
//       >
//         &#8592;
//       </button>
//       <div className="flex items-center gap-2">{renderPageNumbers()}</div>
//       <button
//         className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
//         onClick={next}
//         disabled={active === totalPages}
//       >
//         &#8594;
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";

export default function Pagination() {
  const [active, setActive] = useState(1);
  const totalPages = 2;
  const maxVisible = 5; // Maximum blocks visible

  const getItemProps = (index) => ({
    className: `w-6 h-6 flex items-center justify-center rounded-md text-sm font-medium transition ${
      active === index ? "bg-secondary-d text-black" : "bg-secondary-dt text-white"
    }`,
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active < totalPages) setActive(active + 1);
  };

  const prev = () => {
    if (active > 1) setActive(active - 1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <button key={1} {...getItemProps(1)}>
        1
      </button>
    );

    // Left dots if needed
    if (active > 3) {
      pages.push(
        <span
          key="dots-left"
          className="w-6 h-6 flex items-center justify-center text-2xl text-white"
        >
          .
        </span>
      );
    }

    // Previous adjacent page
    if (active > 2) {
      pages.push(
        <button key={active - 1} {...getItemProps(active - 1)}>
          {active - 1}
        </button>
      );
    }

    // Active page
    if (active !== 1 && active !== totalPages) {
      pages.push(
        <button key={active} {...getItemProps(active)}>
          {active}
        </button>
      );
    }

    // Next adjacent page
    if (active < totalPages - 1) {
      pages.push(
        <button key={active + 1} {...getItemProps(active + 1)}>
          {active + 1}
        </button>
      );
    }

    // Right dots if needed
    if (active < totalPages - 2) {
      pages.push(
        <span
          key="dots-right"
          className="w-6 h-6 flex items-center justify-center text-2xl text-white"
        >
          .
        </span>
      );
    }

    // Always show last page
    pages.push(
      <button key={totalPages} {...getItemProps(totalPages)}>
        {totalPages}
      </button>
    );

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-3 p-4 rounded-lg">
      <button
        className="w-6 h-6 flex items-center justify-center text-white bg-transparent disabled:opacity-30"
        onClick={prev}
        disabled={active === 1}
      >
        &#x276E;
      </button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <button
        className="w-6 h-6 flex items-center justify-center text-white bg-transparent disabled:opacity-30"
        onClick={next}
        disabled={active === totalPages}
      >
        &#x276F;
      </button>
    </div>
  );
}
