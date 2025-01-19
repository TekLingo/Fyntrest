import React from "react";

const CourseCard = ({ title, img, index }) => {
  // Define styles for variants
  const variantStyles = [
    {
      bg: "bg-gradient-to-br from-yellow-700 to-orange-700",
      position: "-top-4 -right-6",
    },
    {
      bg: "bg-gradient-to-br from-blue-400 to-blue-700",
      position: "-left-6",
    },
    {
      bg: "bg-gradient-to-br from-violet-200 to-violet-600",
      position: "-bottom-4 -left-4",
    },
    {
      bg: "bg-gradient-to-br from-purple-600 to-purple-700",
      position: "-top-4 -left-4",
    },
  ];

  // Automatically assign the variant based on the index (cyclically)
  const selectedStyle = variantStyles[index % variantStyles.length];

  return (
    <div className="CourseCard w-52 h-52 rounded-lg flex flex-col items-center justify-center shadow-lg relative overflow-hidden bg-slate-900">
      {/* Decorative Span for Blur Effect */}
      <span
        className={`absolute w-32 h-32 rounded-full blur-2xl opacity-70 ${selectedStyle.bg} ${selectedStyle.position}`}
      ></span>
      <div className="flex flex-col items-center gap-4">
        {/* Icon Placeholder */}
        <img src={img} alt={title} className="w-16 h-16 object-cover" />
        {/* Card Title */}
        <h3 className="text-white text-lg font-semibold text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CourseCard;
