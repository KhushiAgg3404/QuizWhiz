import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  answerQuestions,
  nextQuestion,
  previousQuestion,
} from "../store/quizSlice";

function Questions() {
  const {
    questions,
    currentQuestionIndex,
    answers,
    showExplanation,
  } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();

  const currentQuestion = questions[currentQuestionIndex];

  const currentAnswer = answers.find(
    (answer) => answer.questionId === currentQuestion.id
  );

  const handleOptionClick = (optionIndex) => {
    if (currentAnswer) return;

    dispatch(
      answerQuestions({
        questionId: currentQuestion.id,
        selectedOption: optionIndex,
      })
    );
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      {/* Question */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Question {currentQuestionIndex + 1}
          </span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 leading-relaxed mb-8">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected =
              currentAnswer?.selectedOption === index;

            const isCorrect =
              index === currentQuestion.correctAnswer;

            const isWrong =
              isSelected &&
              !isCorrect &&
              showExplanation;

            let buttonClass =
              "w-full p-5 text-left rounded-xl border transition-all duration-200 ";

            if (showExplanation) {
              if (isCorrect) {
                buttonClass +=
                  "border-green-200 bg-green-50 text-green-900";
              } else if (isWrong) {
                buttonClass +=
                  "border-red-200 bg-red-50 text-red-900";
              } else {
                buttonClass +=
                  "border-gray-200 bg-gray-50 text-gray-500";
              }
            } else if (!currentAnswer) {
              buttonClass +=
                "border-gray-200 bg-white text-gray-800 hover:border-black hover:bg-gray-50";
            } else {
              buttonClass +=
                "border-gray-200 bg-white text-gray-700";
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleOptionClick(index)}
                disabled={!!currentAnswer}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">
                    {option}
                  </span>

                  {showExplanation && isCorrect && (
                    <CheckCircle
                      size={22}
                      className="text-green-600"
                    />
                  )}

                  {showExplanation && isWrong && (
                    <XCircle
                      size={22}
                      className="text-red-600"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && currentQuestion.explanation && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle
              size={18}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-gray-900">
              Explanation
            </h3>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-2">
        <button
          className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft size={18} />
          <span>Previous</span>
        </button>

        {(currentAnswer || showExplanation) && (
          <button
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition"
            onClick={handleNext}
          >
            <span>
              {currentQuestionIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next"}
            </span>

            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Questions;