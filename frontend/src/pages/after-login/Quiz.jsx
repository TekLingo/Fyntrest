import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const quizData = [
  {
    question:
      "The question comes here (Lorem ipsum dolor sit amet, consectetur adipiscing elit)",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 1, // Index of the correct option
  },
  {
    question: "Second question comes here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: 2,
  },
  {
    question: "Third question is here?",
    options: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    correct: 0,
  },
  {
    question: "Third question is here?",
    options: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    correct: 0,
  },
];

const Quiz = () => {
  const totalQuestions = quizData.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(totalQuestions).fill(null)
  );
  const [progressStatus, setProgressStatus] = useState(
    Array(totalQuestions).fill(null)
  ); // null -> default, "correct" -> green, "incorrect" -> red, "unattempted" -> red

  const handleAnswerClick = (index) => {
    if (selectedAnswers[currentQuestion] === null) { // Prevent multiple selections
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentQuestion] = index;
      setSelectedAnswers(updatedAnswers);

      const updatedProgress = [...progressStatus];
      updatedProgress[currentQuestion] =
        index === quizData[currentQuestion].correct ? "correct" : "incorrect";
      setProgressStatus(updatedProgress);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      const updatedProgress = [...progressStatus];
      if (selectedAnswers[currentQuestion] === null) {
        updatedProgress[currentQuestion] = "unattempted"; // Mark unanswered questions
      }
      setProgressStatus(updatedProgress);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-text-g p-4 h-screen bg-[#0d0b21]">
      {/* Left Arrow */}
      <button
        onClick={handlePrevious}
        className="absolute left-10 text-3xl text-text-g"
        disabled={currentQuestion === 0}
      >
        <FaAngleLeft />
      </button>
      <div className="w-1/2 flex flex-col gap-20">
        <h1 className="text-2xl text-center font-title mb-6">
          {currentQuestion + 1}. {quizData[currentQuestion].question}
        </h1>

        <div className="space-y-3">
          {quizData[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`w-full p-3 rounded-lg text-left font-medium transition-colors ${
                selectedAnswers[currentQuestion] !== null
                  ? index === quizData[currentQuestion].correct
                    ? "bg-green-500"
                    : selectedAnswers[currentQuestion] === index
                    ? "bg-red-500"
                    : "bg-[#1a1535]"
                  : "bg-[#1a1535] hover:bg-[#322d5f]"
              }`}
              disabled={selectedAnswers[currentQuestion] !== null} // Disable after first selection
            >
              {option}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-secondary-lt flex">
          {progressStatus.map((status, index) => (
            <div
              key={index}
              className={`h-full transition-all ${
                status === "correct" || status === "incorrect"
                  ? "bg-secondary-dt"
                  : status === "unattempted"
                  ? "bg-red-500"
                  : "bg-secondary-lt"
              }`}
              style={{ width: `${100 / totalQuestions}%` }}
            ></div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="absolute right-10 text-3xl text-text-g"
        disabled={currentQuestion === totalQuestions - 1}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Quiz;
