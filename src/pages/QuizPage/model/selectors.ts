import { StateSchema } from '@/app/providers/store/config/StateSchema.ts'


export const selectLoading = (state: StateSchema) => state.quizPage.isLoading
export const selectError = (state: StateSchema) => state.quizPage.error
export const selectQuizTitle = (state: StateSchema) => state.quizPage.quizData?.title
export const selectCountCorrectAnswers = (state: StateSchema) => state.quizPage.countCorrectAnswers
export const selectCurrentQuestionIdx = (state: StateSchema) => state.quizPage.currentQuestionIdx
export const selectQuestions = (state: StateSchema) => state.quizPage.quizData?.questions || []
