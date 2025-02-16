import React from "react";

const BlogCard = ({ title, author, category, content, image }) => {
  return (
    <div className="text-text-g">
      {/* Card Content */}
      <div className="h-60 flex mx-10 justify-center overflow-hidden">
        <div className="w-3/5">
          <div className="flex flex-col gap-4">
            <h2 className="font-title text-4xl">{title}</h2>
            <p className="font-body text-secondary-d text-xl">
              <span>{author}</span> | <span>{category}</span>
            </p>
            <p>{content}</p>
          </div>
        </div>
        <div className="w-2/5 flex justify-center">
          <img src={image} alt="Blog" className="w-auto h-auto rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
