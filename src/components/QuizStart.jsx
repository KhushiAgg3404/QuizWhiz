import React, { useState } from "react";
import { Sparkles, BookOpen, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setQuestions, startQuiz } from "../store/quizSlice";

function QuizStart() {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/generate-quiz",
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

      console.log("Generated Questions:", data);

      dispatch(setQuestions(data));
      dispatch(startQuiz());

    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
            <Sparkles className="w-12 h-12 text-purple-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            QuizWhiz AI
          </h1>

          <p className="text-lg text-gray-600">
            Generate AI-powered quizzes on any topic instantly
          </p>
        </div>

        {/* Topic */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Topic
          </label>

          <input
            type="text"
            placeholder="Operating Systems, React, DBMS..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Number of Questions */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Questions
          </label>

          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
            <option value={20}>20 Questions</option>
          </select>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <BookOpen className="mx-auto mb-2 text-blue-600" />
            <p className="font-semibold">AI Generated</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl text-center">
            <Sparkles className="mx-auto mb-2 text-purple-600" />
            <p className="font-semibold">Custom Difficulty</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-green-600">⚡</p>
            <p className="font-semibold">Instant Results</p>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateQuiz}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-60"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Generating Quiz...
            </span>
          ) : (
            "Generate Quiz"
          )}
        </button>
      </div>
    </div>
  );
}

export default QuizStart;