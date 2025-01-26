import React from "react";
import { MdOutlinePlayCircle } from "react-icons/md";

const Module = ({ thumbnail, title, description }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl p-4 bg-bg-color max-w-3xl min-w-full h-80">
      {/* Thumbnail */}
      <div className="w-1/3 h-full mr-4 relative rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center text-text-g">
          <MdOutlinePlayCircle className="text-3xl" size={60} />
        </div>
        <iframe
          className="w-full h-full"
          src={thumbnail}
          title="Course Video Thumbnail"
          allowFullScreen
        />
      </div>

      {/* Title and Description */}
      <div className="w-3/5">
        <h2 className="text-3xl font-bold mb-2 font-body text-text-g">
          {title}
        </h2>
        <p className="text-text-g text-md font-body leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Module;
