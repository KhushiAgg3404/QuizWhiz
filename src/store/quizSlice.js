import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    isQuizCompleted: false,
    score: 0,
    timeLeft: 300,
    isTimerActive: false,
    showExplanation: false,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },

        startQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.answers = [];
            state.isQuizCompleted = false;
            state.score = 0;
            state.timeLeft = 300;
            state.isTimerActive = true;
            state.showExplanation = false;
        },

        answerQuestions: (state, action) => {
            const { questionId, selectedOption } = action.payload;

            const question = state.questions.find((q) => q.id === questionId);
            const isCorrect = selectedOption === question.correctAnswer;

            const existingIndex = state.answers.findIndex(ans => ans.questionId === questionId);

            const answer = {
                questionId,
                selectedOption,
                isCorrect
            };

            if (existingIndex !== -1) {
                // Replace existing answer
                state.answers[existingIndex] = answer;
            } else {
                // Add new answer
                state.answers.push(answer);
            }

            // Recalculate score
            state.score = state.answers.filter((a) => a.isCorrect).length;

            // Always show explanation after answering
            state.showExplanation = true;
        },


        decrementTimer: (state) => {
            if (state.timeLeft > 0 && state.isTimerActive) {
                state.timeLeft -= 1;
            } else if (state.timeLeft === 0) {
                state.isQuizCompleted = true;
                state.isTimerActive = false;
            }
        },

        nextQuestion: (state) => {
            state.showExplanation = false;
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
            } else {
                state.isQuizCompleted = true;
                state.isTimerActive = false;
            }
        },

        previousQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;

                const currentQuestionId = state.questions[state.currentQuestionIndex].id;
                state.answers = state.answers.filter(
                    (answer) => answer.questionId !== currentQuestionId
                );

                state.showExplanation = false;

                // Recalculate score
                state.score = state.answers.filter((answer) => answer.isCorrect).length;
            }
        },

        resetQuiz:(state)=>{
            state.currentQuestionsIndex=0;
            state.answers=[];
            state.isQuizCompleted=false;
            state.score=0;
            state.timeLeft=300;
            state.isTimerActive=false;
            state.showExplanation=false;
        }
    },
});

export const {
    setQuestions,
    startQuiz,
    decrementTimer,
    answerQuestions,
    nextQuestion,
    previousQuestion,
    resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
