import React from "react";
import { FaAngleRight } from "react-icons/fa6";

const BlogReadCard = ({ title }) => {
  return (
    <div className="h-48 w-96 bg-primary_p rounded-xl flex flex-col p-6 gap-6">
      <div className="place-self-end font-body flex gap-2 items-center cursor-pointer">
        <p>Next</p>
        <div className="bg-primary-fp rounded-full h-6 w-6 flex items-center justify-center">
          <FaAngleRight />
        </div>
      </div>
      <div>
        <h5 className="font-title text-xl">{title}</h5>
      </div>
    </div>
  );
};

export default BlogReadCard;
