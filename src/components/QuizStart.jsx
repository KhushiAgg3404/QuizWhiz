import React, { useState } from "react";
import { Sparkles, BookOpen, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  setQuestions,
  setTimer,
  startQuiz,
} from "../store/quizSlice";

function QuizStart() {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);

  // Timer in seconds
  const [timer, setTimerValue] = useState(300);

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      toast.warning("Please enter a topic");
      return;
    }

    let toastId;

    try {
      setLoading(true);

      toastId = toast.loading(
        "Generating AI-powered quiz... This may take a few seconds."
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/generate-quiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic,
            difficulty,
            count,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate quiz");
      }

      toast.update(toastId, {
        render: "Quiz generated successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      dispatch(setQuestions(data));
      dispatch(setTimer(timer));
      dispatch(startQuiz());

    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: error.message || "Failed to generate quiz ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-bold text-gray-900">
            QuizWhiz AI
          </h1>

          
        </div>

        <p className="text-gray-500 text-lg">
          Generate customized quizzes on any topic with AI-powered question generation.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">

            {/* Topic */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topic
              </label>

              <input
                type="text"
                placeholder="Enter a topic (e.g. Science, History, Technology)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black focus:outline-none"
              />

              
            </div>

            {/* Difficulty + Questions */}
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black focus:outline-none"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Questions
                </label>

                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black focus:outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            {/* Timer */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Timer
              </label>

              <select
                value={timer}
                onChange={(e) => setTimerValue(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black focus:outline-none"
              >
                <option value={60}>1 Minute</option>
                <option value={180}>3 Minutes</option>
                <option value={300}>5 Minutes</option>
                <option value={600}>10 Minutes</option>
                <option value={900}>15 Minutes</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateQuiz}
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={20} className="animate-spin" />
                  Generating Quiz...
                </span>
              ) : (
                "Generate Quiz"
              )}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE PANEL */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-6">
            <h2 className="font-bold text-xl mb-5">
              Quiz Summary
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">
                  Topic
                </p>
                <p className="font-semibold">
                  {topic || "Not Selected"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Difficulty
                </p>
                <p className="font-semibold">
                  {difficulty}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Questions
                </p>
                <p className="font-semibold">
                  {count}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Duration
                </p>
                <p className="font-semibold">
                  {timer / 60} minutes
                </p>
              </div>
            </div>

            {/* <div className="border-t mt-6 pt-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  AI Generated
                </span>

                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  Instant Feedback
                </span>

                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  Custom Timer
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizStart;