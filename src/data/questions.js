import React from "react";
import {
  Award,
  Clock,
  RefreshCw,
  Target,
  Trophy,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuiz } from "../store/quizSlice";

function Result() {
  const dispatch = useDispatch();

  const {
    score,
    questions,
    answers,
    timeLeft,
    timer,
  } = useSelector((state) => state.quiz);

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const totalTime = timer || 300;
  const timeUsed = totalTime - timeLeft;

  const minutesUsed = Math.floor(timeUsed / 60);
  const secondsUsed = timeUsed % 60;

  const handleReset = () => {
    dispatch(resetQuiz());
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding Performance 🎉";
    if (percentage >= 75) return "Great Job 👏";
    if (percentage >= 50) return "Good Effort 👍";
    return "Keep Practicing 💪";
  };

  const getPerformanceBadge = () => {
    if (percentage >= 80)
      return {
        text: "Excellent",
        style: "bg-green-100 text-green-700",
      };

    if (percentage >= 50)
      return {
        text: "Good Attempt",
        style: "bg-yellow-100 text-yellow-700",
      };

    return {
      text: "Needs Improvement",
      style: "bg-red-100 text-red-700",
    };
  };

  const badge = getPerformanceBadge();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-12">

          {/* Score Circle */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg
              className="w-40 h-40 -rotate-90"
              viewBox="0 0 160 160"
            >
              <circle
                cx="80"
                cy="80"
                r="65"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />

              <circle
                cx="80"
                cy="80"
                r="65"
                stroke={
                  percentage >= 70
                    ? "#22c55e"
                    : percentage >= 50
                    ? "#f59e0b"
                    : "#ef4444"
                }
                strokeWidth="12"
                fill="none"
                strokeDasharray="408"
                strokeDashoffset={
                  408 - (408 * percentage) / 100
                }
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-500 mb-1" />

              <span className="text-4xl font-bold text-gray-900">
                {percentage}%
              </span>

              <span className="text-sm text-gray-500">
                Score
              </span>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Quiz Complete!
          </h1>

          <p className="text-xl text-gray-500 mb-4">
            {getPerformanceMessage()}
          </p>

          <span
            className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${badge.style}`}
          >
            {badge.text}
          </span>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
            <Target className="w-8 h-8 text-blue-600 mb-4" />

            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              Correct Answers
            </div>

            <div className="text-5xl font-bold text-gray-900">
              {score}
            </div>

            <div className="text-gray-500 mt-2">
              out of {totalQuestions}
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
            <Award className="w-8 h-8 text-purple-600 mb-4" />

            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              Accuracy
            </div>

            <div className="text-5xl font-bold text-gray-900">
              {percentage}%
            </div>

            <div className="text-gray-500 mt-2">
              Final Score
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
            <Clock className="w-8 h-8 text-green-600 mb-4" />

            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              Time Used
            </div>

            <div className="text-5xl font-bold text-gray-900">
              {minutesUsed}:{String(secondsUsed).padStart(2, "0")}
            </div>

            <div className="text-gray-500 mt-2">
              Quiz Duration
            </div>
          </div>
        </div>

        {/* REVIEW */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Question Review
          </h2>

          <div className="space-y-3 max-h-[450px] overflow-y-auto">
            {questions.map((question, index) => {
              const answer = answers.find(
                (a) => a.questionId === question.id
              );

              const isCorrect =
                answer?.isCorrect ?? false;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900 mb-1">
                      Question {index + 1}
                    </p>

                    <p className="text-sm text-gray-600">
                      {question.question}
                    </p>
                  </div>

                  {isCorrect ? (
                    <div className="flex items-center gap-2 text-green-700 font-medium">
                      <CheckCircle size={18} />
                      Correct
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-700 font-medium">
                      <XCircle size={18} />
                      Incorrect
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Performance Summary
          </h3>

          <p className="text-gray-600 leading-relaxed">
            You answered{" "}
            <strong>{score}</strong> out of{" "}
            <strong>{totalQuestions}</strong> questions
            correctly and achieved an accuracy of{" "}
            <strong>{percentage}%</strong>.
          </p>
        </div>

        {/* BUTTON */}
        <div className="text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition font-semibold"
          >
            <RefreshCw size={20} />
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;