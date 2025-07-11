import React, { useEffect, useRef } from 'react'
import QuizStart from './QuizStart'
import ProgressBar from './ProgressBar'
import Timer from './Timer'
import Questions from './Questions'
import Result from './Result'
import { useDispatch, useSelector } from 'react-redux'
import { sampleQuestions } from '../data/questions'
import { setQuestions } from '../store/quizSlice'

function Quiz1() {
  const dispatch = useDispatch();
  const topRef = useRef(null); // 👈 Reference to scroll to

  // Load the questions when component mounts
  useEffect(() => {
    dispatch(setQuestions(sampleQuestions));
  }, [dispatch]);

  const {
    questions,
    currentQuestionIndex,
    isQuizCompleted,
    isTimerActive,
    answers
  } = useSelector((state) => state.quiz);

  // Scroll to quiz content when quiz starts
  useEffect(() => {
    if (isTimerActive && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTimerActive]);

  // Loading state
  if (questions.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading</p>
        </div>
      </div>
    );
  }

  // Quiz complete
  if (isQuizCompleted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4'>
        <Result />
      </div>
    );
  }

  // Quiz not started
  if (!isTimerActive && answers.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4'>
        <QuizStart />
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto mb-8' ref={topRef}> {/* 👈 Scroll target */}
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
            <div className='flex-1'>
              <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
            </div>
            <div className='md:ml-6'>
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
