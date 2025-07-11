import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestions, nextQuestion, previousQuestion } from '../store/quizSlice';

function Questions() {
  const { questions, currentQuestionIndex, answers, showExplanation } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find((answer) => answer.questionId === currentQuestion.id);

  const handleOptionClick = (optionIndex) => {
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>
          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentAnswer?.selectedOption === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const isWrong = isSelected && !isCorrect && showExplanation;

              let buttonClass = `w-full p-4 text-left rounded-xl border transition-all duration-100 `;

              if (showExplanation) {
                if (isCorrect) {
                  buttonClass += `border-green-500 bg-green-50 text-green-800`;
                } else if (isWrong) {
                  buttonClass += `border-red-500 bg-red-50 text-red-800`;
                } else {
                  buttonClass += `border-gray-300 bg-gray-50 text-gray-600`;
                }
              } else {
                buttonClass += `border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md`;
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleOptionClick(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle size={24} className="text-green-600" />
                    )}
                    {showExplanation && isWrong && (
                      <XCircle size={24} className="text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && currentQuestion.explanation && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue-800" />
              </div>
              <div className="ml-3">
                <p className="text-blue-800 font-medium">Explanation:</p>
                <p className="text-blue-800 mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:cursor-not-allowed transition-all duration-100"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft size={20} />
            <span>Previous</span>
          </button>

          {(currentAnswer || showExplanation) && (
            <button
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:cursor-not-allowed transition-all duration-100"
              onClick={handleNext}
            >
              <span>
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
              </span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;
