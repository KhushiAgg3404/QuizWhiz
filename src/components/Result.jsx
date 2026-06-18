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

  const { score, questions, answers, timeLeft, timer } = useSelector(
    (state) => state.quiz
  );

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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-5">
            <Trophy className="w-10 h-10 text-amber-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Quiz Complete!
          </h1>

          <p className="text-lg text-gray-500">
            {getPerformanceMessage()}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-2">
              {score} / {totalQuestions}
            </div>

            <div className="text-gray-500">
              Correct Answers
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-2">
              {percentage}%
            </div>

            <div className="text-gray-500">
              Final Score
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-green-600" />
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-2">
              {minutesUsed}:{String(secondsUsed).padStart(2, "0")}
            </div>

            <div className="text-gray-500">
              Time Used
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Question Review
          </h2>

          <div className="space-y-3 max-h-[450px] overflow-y-auto">
            {questions.map((question, index) => {
              const answer = answers.find(
                (a) => a.questionId === question.id
              );

              const isCorrect = answer?.isCorrect ?? false;

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

                  <div className="ml-4">
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Performance Summary
          </h3>

          <p className="text-gray-600">
            You answered{" "}
            <span className="font-semibold text-gray-900">
              {score}
            </span>{" "}
            out of{" "}
            <span className="font-semibold text-gray-900">
              {totalQuestions}
            </span>{" "}
            questions correctly, achieving a score of{" "}
            <span className="font-semibold text-gray-900">
              {percentage}%
            </span>
            .
          </p>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition font-semibold"
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