import React, { useEffect, useRef } from 'react';
import QuizStart from './QuizStart';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import Questions from './Questions';
import Result from './Result';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTimer } from '../store/quizSlice';

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
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTimerActive]);

  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, isTimerActive]);

  // Show AI Quiz Generator initially
  if (!isTimerActive && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <QuizStart />
      </div>
    );
  }

  // Quiz finished
  if (isQuizCompleted || timeLeft === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <Result />
      </div>
    );
  }

  // Quiz generated but not started
  if (!isTimerActive && answers.length === 0 && questions.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <QuizStart />
      </div>
    );
  }

  // Quiz running
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-8" ref={topRef}>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={questions.length}
              />
            </div>

            <div className="md:ml-6">
              <Timer />
            </div>
          </div>
        </div>
      </div>

      <Questions />
    </div>
  );
}

export default Quiz1;