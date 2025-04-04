import React, { useState, useEffect } from "react";
import { IoMdRadioButtonOn } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import AddModulePopUp from "./AddModulePopUp";

const MCQComponent = ({ questions, updateQuestions, validateQuestions }) => {
  const [error, setError] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  const addQuestion = () => {
    const lastQuestion = questions[questions.length - 1];
    if (
      !lastQuestion.question.trim() ||
      (lastQuestion.type !== "Short Answer" &&
        lastQuestion.options.some((opt) => !opt.trim()))
    ) {
      setError(
        "Please fill in the question and all options before adding a new question."
      );
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    updateQuestions([
      ...questions,
      {
        question: "",
        options: [""],
        hasOther: false,
        otherValue: "",
        selectedOption: null,
        type: "Multiple Choice",
      },
    ]);
  };

  const updateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    updateQuestions(newQuestions);
  };

  const handleTypeChange = (index, type) => {
    const newQuestions = [...questions];
    newQuestions[index].type = type;
    newQuestions[index].options = type === "Short Answer" ? [] : [""]; // Reset options for Short Answer
    newQuestions[index].hasOther = false; // Reset "Other" option
    newQuestions[index].otherValue = ""; // Clear "Other" value
    updateQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    updateQuestions(newQuestions);
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    updateQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      updateQuestions(newQuestions);
    }
  };

  useEffect(() => {
    // Trigger validation whenever questions change
    validateQuestions();
  }, [questions, validateQuestions]);

  return (
    <div className="w-11/12 mx-auto flex flex-col gap-5 text-text-g">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {questions.map((q, questionIndex) => (
        <div
          key={questionIndex}
          className="p-6 rounded-lg shadow-md relative break-words w-full bg-primary_p"
          style={{ boxShadow: "-7px 0 0 0 #A990FA" }}
        >
          <div className="flex justify-between items-center">
            <textarea
              value={q.question}
              onChange={(e) =>
                updateQuestion(questionIndex, {
                  ...q,
                  question: e.target.value,
                })
              }
              className="w-full text-lg font-semibold rounded-md border-b-2 focus:outline-none border-secondary-d p-2 resize-none overflow-hidden bg-primary-fp"
              placeholder="Insert question"
              style={{
                minHeight: "3rem",
                maxHeight: "3rem",
                overflowY: "hidden",
              }}
            />
            <select
              value={q.type}
              onChange={(e) => handleTypeChange(questionIndex, e.target.value)}
              className="ml-4 border-2 w-60 border-secondary-d p-2 rounded-md bg-primary-fp outline-none text-lg"
            >
              <option className="text-text-g">Multiple Choice</option>
              <option className="text-text-g">Checkboxes</option>
              <option className="text-text-g">Short Answer</option>
            </select>
            {questions.length > 1 && (
              <button
                onClick={() => deleteQuestion(questionIndex)}
                className="ml-4 p-2 text-text-g"
              >
                <IoClose size={24} />
              </button>
            )}
          </div>

          {q.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mt-2 relative">
              {q.type === "Multiple Choice" ? (
                <IoMdRadioButtonOn className="mr-2 text-lg" />
              ) : (
                <RiCheckboxBlankLine className="mr-2 text-lg" />
              )}
              <textarea
                value={option}
                onChange={(e) => {
                  const newOptions = [...q.options];
                  newOptions[optionIndex] = e.target.value;
                  updateQuestion(questionIndex, { ...q, options: newOptions });
                }}
                className="w-full text-lg font-semibold border-b-2 focus:outline-none border-secondary-d p-2 resize-none overflow-hidden bg-transparent"
                placeholder={`Option ${optionIndex + 1}`}
                style={{
                  minHeight: "3rem",
                  maxHeight: "3rem",
                  overflowY: "hidden",
                }}
              />
              {q.options.length > 1 && (
                <button
                  onClick={() => deleteOption(questionIndex, optionIndex)}
                  className="ml-2 p-2 text-text-g"
                >
                  <IoClose size={20} />
                </button>
              )}
            </div>
          ))}

          {q.hasOther && (
            <div className="flex items-center mt-2">
              {q.type === "Multiple Choice" ? (
                <IoMdRadioButtonOn className="mr-2 text-lg" />
              ) : (
                <RiCheckboxBlankLine className="mr-2 text-lg" />
              )}
              <input
                type="text"
                className="w-full text-lg font-semibold border-b-2 focus:outline-none border-secondary-d p-2 bg-transparent"
                placeholder="Other"
                disabled
              />
            </div>
          )}

          {q.type !== "Short Answer" && (
            <div className="mt-4 flex flex-col space-y-2">
              <div className="flex items-center mt-2">
                <GoPlus className="mr-2 text-lg" />
                <button
                  onClick={() => addOption(questionIndex)}
                  className="text-left p-2 rounded cursor-pointer hover:border-2 hover:border-secondary-d text-lg"
                >
                  Add Option
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="w-full">
        <button
          onClick={addQuestion}
          className="w-44 bg-transparent border-2 border-secondary-lt py-2 rounded-lg flex items-center justify-center gap-2 justify-self-center"
        >
          <GoPlus size={25} />
          <p className="text-xl">Add Question</p>
        </button>
      </div>
    </div>
  );
};

export default MCQComponent;
