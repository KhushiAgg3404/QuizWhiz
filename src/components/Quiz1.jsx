import React, { useEffect, useRef } from "react";
import QuizStart from "./QuizStart";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import Questions from "./Questions";
import Result from "./Result";
import { useDispatch, useSelector } from "react-redux";
import { decrementTimer } from "../store/quizSlice";

function Quiz1() {
  const dispatch = useDispatch();
  const topRef = useRef(null);

  const {
    questions,
    currentQuestionIndex,
    isQuizCompleted,
    isTimerActive,
    answers,
    timeLeft,
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (isTimerActive && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTimerActive]);

  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, isTimerActive]);

  // Initial Screen
  if (!isTimerActive && questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <QuizStart />
      </div>
    );
  }

  // Quiz Completed
  if (isQuizCompleted || timeLeft === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <Result />
      </div>
    );
  }

  // Quiz Generated but Not Started
  if (!isTimerActive && answers.length === 0 && questions.length > 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <QuizStart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto" ref={topRef}>
        {/* Header Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Progress Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  Quiz In Progress
                </h2>
              </div>

              <ProgressBar
                current={currentQuestionIndex + 1}
                total={questions.length}
              />
            </div>

            {/* Timer */}
            <div className="bg-slate-100 border border-gray-200 rounded-xl px-6 py-4 min-w-[180px]">
              <p className="text-xs text-gray-500 mb-1">
                Remaining Time
              </p>

              <Timer />
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Questions Section */}
          <div className="lg:col-span-3">
            <Questions />
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-5">
                Quiz Status
              </h3>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-500">
                    Current Question
                  </p>

                  <p className="text-xl font-semibold text-gray-900">
                    {currentQuestionIndex + 1} / {questions.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Answered
                  </p>

                  <p className="text-xl font-semibold text-green-600">
                    {answers.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Remaining
                  </p>

                  <p className="text-xl font-semibold text-orange-600">
                    {questions.length - answers.length}
                  </p>
                </div>
              </div>

              <div className="border-t mt-6 pt-6">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                    AI Generated
                  </span>

                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                    Timed Quiz
                  </span>

                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                    Instant Results
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Quiz1;