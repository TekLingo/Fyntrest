import React from "react";

const Breadcrumb = ({ items }) => (
  <div className="flex flex-row items-center justify-start gap-2 mx-28 text-text-g">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <p>{">"}</p>}
        <p className={index === items.length - 1 ? "font-bold" : ""}>
          {typeof item === "string" && index !== items.length - 1
            ? `${item.slice(0, 6)}${item.length > 6 ? "..." : ""}`
            : item}
        </p>
      </React.Fragment>
    ))}
  </div>
);

export default Breadcrumb;
