import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import CompleteImg from "../../assets/Images/hooray.png";

const quizData = [
  {
    question:
      "The question comes here (Lorem ipsum dolor sit amet, consectetur adipiscing elit)",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 1,
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
];

const Quiz = () => {
  const totalQuestions = quizData.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(totalQuestions).fill(null)
  );
  const [progressStatus, setProgressStatus] = useState(
    Array(totalQuestions).fill(null)
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [coins, setCoins] = useState(0);

  const handleAnswerClick = (index) => {
    if (selectedAnswers[currentQuestion] === null) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentQuestion] = index;
      setSelectedAnswers(updatedAnswers);

      const updatedProgress = [...progressStatus];
      if (index === quizData[currentQuestion].correct) {
        updatedProgress[currentQuestion] = "correct";
        setCoins((prev) => prev + 10);
      } else {
        updatedProgress[currentQuestion] = "incorrect";
        setCoins((prev) => prev - 5);
      }
      setProgressStatus(updatedProgress);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(totalQuestions).fill(null));
    setProgressStatus(Array(totalQuestions).fill(null));
    setQuizCompleted(false);
    setCoins(0);
  };

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center text-text-g p-4 h-screen gap-8">
        <FaArrowLeft className="flex place-self-start h-6 w-auto md:ml-10" />
        <h1 className="text-3xl font-bold font-title">Quiz Complete</h1>
        <p className="text-lg mt-2 font-body">
          YAYYY!! You just crushed that quiz! Keep going and build your
          financial superpowers!
        </p>
        <img src={CompleteImg} alt="Completion" className="w-60 h-60 my-5" />
        <p className="text-xl font-body">{coins} coins earned!!</p>
        <div className="flex gap-4 mt-5 font-body">
          <button
            className="px-6 py-2 rounded-lg border-secondary-dt border-2"
            onClick={restartQuiz}
          >
            Retry Quiz
          </button>
          <button className="bg-secondary-dt px-6 py-2 rounded-lg">
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-text-g p-4 h-screen">
      <FaArrowLeft className="flex place-self-start h-6 w-auto font-thin md:ml-10" />
      <button
        onClick={handlePrevious}
        className="absolute left-10 text-3xl text-text-g"
        disabled={currentQuestion === 0}
      >
        <FaAngleLeft />
      </button>
      <div className="w-1/2 flex flex-col gap-20">
        <h1 className="text-2xl text-center font-title">
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
              disabled={selectedAnswers[currentQuestion] !== null}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="w-full h-2 bg-secondary-lt flex">
          {progressStatus.map((status, index) => (
            <div
              key={index}
              className={`h-full transition-all ${
                status === "correct"
                  ? "bg-green-500"
                  : status === "incorrect"
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
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Quiz;
