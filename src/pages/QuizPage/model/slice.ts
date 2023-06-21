import { fetchQuiz } from './service'
import { createSlice } from '@reduxjs/toolkit'
import { QuizPageSchema } from './types'

const initialState: QuizPageSchema = {
  isLoading: false,
  error: undefined,
  quizData: undefined,
  countCorrectAnswers: 0,
  currentQuestionIdx: 0
}

export const quizPageSlice = createSlice({
  name: 'quizWriteAnswer',
  initialState,
  reducers: {
    incQuestionIdx: (state) => {
      state.currentQuestionIdx++
    },
    incCorrectAnswer: (state) => {
      state.countCorrectAnswers++
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.quizData = action.payload
        state.countCorrectAnswers = 0
        state.currentQuestionIdx = 0
        state.isLoading = false
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
  }
})

export const { actions: quizPageActions, reducer: quizPageReducer } = quizPageSlice
