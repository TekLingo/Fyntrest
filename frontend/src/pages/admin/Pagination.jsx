import React, { useState } from "react";

export default function Pagination() {
  const [active, setActive] = useState(1);
  const totalPages = 2;
  const maxVisible = 5; // Maximum blocks visible

  const getItemProps = (index) => ({
    className: `w-6 h-6 flex items-center justify-center rounded-md text-sm font-medium transition ${
      active === index
        ? "bg-secondary-d text-black"
        : "bg-secondary-dt text-white"
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
