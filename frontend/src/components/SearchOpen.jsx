import React, { useRef, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";

const SearchOpen = ({ onClose, inputValue, setInputValue }) => {
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const topics = [
    "Why learn about finance?",
    "Understanding budgeting",
    "How to save money?",
    "Investing basics",
  ];

  return (
    <div
      ref={ref}
      className="z-50 text-text-g bg-primary-fp absolute right-144px h-60 w-[500px] top-3 rounded-xl overflow-hidden"
    >
      <div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-1 bg-primary_p h-12 focus:outline-none"
          />
          <div className="px-4 py-1 flex flex-col gap-2">
            <h2 className="text-sm text-purple-200">Popular topics</h2>
            <ul className="space-y-3">
              {topics.map((topic, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center"
                >
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => setInputValue(topic)}
                  >
                    {topic}
                  </span>
                  <FiExternalLink
                    className="text-white cursor-pointer"
                    onClick={() => setInputValue(topic)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOpen;
