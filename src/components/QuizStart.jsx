import React from 'react'
import { BookOpen, Clock, Trophy,Play } from "lucide-react"
import { useDispatch } from 'react-redux'
import { startQuiz } from '../store/quizSlice';

function QuizStart () {
    const dispatch=useDispatch();
    const handleStartQuiz=()=>{
        dispatch(startQuiz());
    };

    return (
        <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-2xl shadow-xl p-8 text-center'>
                <div className='mb-8'>
                    <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6'>
                        <BookOpen className=' w-12 h-12' />
                    </div>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                        Aptitude Mastery Quiz
                    </h1>
                    <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
                         Test your logical reasoning, math skills, and problem-solving ability with this quick aptitude quiz.
                    </p>
                </div>
                {/* cards */}
                <div className='grid grid-cols-3 gap-6 mb-8'>
                    <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl '>
                        <div className='flex items-center justify-center mb-4'>
                            <BookOpen className='w-8 h-8 text-blue' />
                        </div>
                        <div className='text-2xl font-bold text-blue-800 mb-2'>10</div>
                        <div className='text-2xl font-medium'>Questions</div>
                    </div>
                    <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl '>
                        <div className='flex items-center justify-center mb-4'>
                            <Clock className='w-8 h-8 text-blue' />
                        </div>
                        <div className='text-2xl font-bold text-purple-800 mb-2'>5:00</div>
                        <div className='text-2xl font-medium'>Minutes</div>
                    </div>
                    <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl '>
                        <div className='flex items-center justify-center mb-4'>
                            <Trophy className='w-8 h-8 text-blue' />
                        </div>
                        <div className='text-2xl font-bold text-green-800 mb-2'>100%</div>
                        <div className='text-2xl font-medium'>Max Score</div>
                    </div>

                </div>
                {/* Rules */}
                <div className='mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                        Quiz Rules
                    </h3>
                    <div className='text-left bg-gray-50  p-6 rounded-xl max-w-2xl mx-auto'>
                        <ul className='space-y-3 text-gray-700'>
                            <li className='flex items-start'>
                                <span className='flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mx-3 mt-0.5'>1</span>

                                <span>
                                    Each question has multiple choice answer.
                                </span>

                            </li>
                            <li className='flex items-start'>
                                <span className='flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mx-3 mt-0.5'>2</span>

                                <span>
                                    You have 5 minutes to complete all questions.
                                </span>

                            </li>
                            <li className='flex items-start'>
                                <span className='flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mx-3 mt-0.5'>3</span>

                                <span>
                                    Once you select an answer, you'll see the explanation.
                                </span>

                            </li>
                            <li className='flex items-start'>
                                <span className='flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mx-3 mt-0.5'>4</span>

                                <span>
                                    You can navigate back to previous questions.
                                </span>

                            </li>
                           
                        </ul>
                    </div>
                </div>

                <button className='inline-flex items-center space-x-3 py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700  transition-all   shadow-lg font-semibold cursor-pointer  ease-in' onClick={handleStartQuiz}>
                    <Play size={24} />
                    <span>Start Quiz</span>

                </button>

            </div>


        </div>
    )
}

export default QuizStart




