import React from "react";

const Card = ({ title, img }) => {
  return (
    <div className="flex flex-col w-80 h-80 bg-primary-b rounded-2xl font-body text-xl cursor-pointer">
      {/* Render the image */}
      <div className="flex justify-center items-center p-8 h-[75%]">
        <img src={img} alt="Card" className="h-full w-auto" />
      </div>
      {/* Render the title */}
      <div className="flex items-center flex-1 bg-gradient-to-b from-primary-b from-10% to-secondary-lt/30 to-24% px-4 rounded-b-2xl">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Card;
