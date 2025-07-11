import React from 'react'
import { Award, Clock, RefreshCw, Target, Trophy } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { resetQuiz } from '../store/quizSlice';

const Result = () => {

    const dispatch=useDispatch();

    const {score, questions, answers, timeLeft}=useSelector((state)=>state.quiz);

    const totalQuestions=questions.length;
    const percentage=Math.round((score/totalQuestions)*100);
    const timeUsed=300-timeLeft;
    const minuteUsed= Math.floor(timeUsed/60);
    const secondUsed= timeUsed%60;

    const handleReset=()=>{
        dispatch(resetQuiz());
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-xl shadow-xl p-6 text-center'>
                {/* header */}
                <div className='mb-8'>
                    <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6'>
                        <Trophy className=' w-12 h-12' />
                    </div>
                    <h1 className='text-4xl font-bold text-gray-800'>Quiz Complete!</h1>
                </div>
                {/* cards */}
                <div className='grid grid-cols-3 gap-6 mb-8'>
                    <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl '>
                        <div className='flex items-center justify-center mb-4'>
                            <Target className='w-8 h-8 text-blue-600' />
                        </div>
                        <div className='text-3xl font-bold text-blue-800 mb-2'>  {score} / {totalQuestions} </div>
                        <div className='text-blue-600 font-medium'>Question Correct</div>
                    </div>
                    <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl '>
                        <div className='flex items-center justify-center mb-4'>
                            <Award className='w-8 h-8 text-purple-600' />
                        </div>
                        <div className='text-3xl font-bold text-purple-800 mb-2'>  {percentage}% </div>
                        <div className='text-purple-600 font-medium'>Score Percentage</div>
                    </div>
                    <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl '>
                        <div className='flex items-center justify-center mb-4'>
                            <Clock className='w-8 h-8 text-green-600' />
                        </div>
                        <div className='text-3xl font-bold text-green-800 mb-2'> {minuteUsed}:{secondUsed.toString().padStart(2,0)} </div>
                        <div className='text-green-600 font-medium'>Time Used</div>
                    </div>
                </div>

                {/* Result */}
                <div className='mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>Question Review</h3>

                    {/* Displaying Dynamic Question */}
                    <div className='grid gap-4 max-h-64 overflow-y-auto'>
                        {questions.map((questions,index)=>{
                            const answer=answers.find((a)=>a.questionId ===questions.id);
                            const isCorrect=answer?.isCorrect ?? false;

                            return <div key={index} className={`flex items-center justify-between p-4 rounded-lg border-2 ${isCorrect? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`} > 

                            <span>Question {index+1}</span>
                            <span className={` px-3 py-1 rounded-full text-sm font-medium ${isCorrect? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}> </span>


                            </div>;
                        })}
                    </div>
                    <button className='inline-flex items-center spa-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:fromblue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold text-lg cursor-pointer mt-6' onClick={handleReset}>
                    <RefreshCw size={34} className='pr-2' />
                    Take Quiz Again
                    </button>

                </div>


            </div>

        </div>
    )
}

export default Result
