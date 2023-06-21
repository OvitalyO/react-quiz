import { fetchQuizList } from './service'
import { createSlice } from '@reduxjs/toolkit'
import { CatalogPageSchema } from './types'

const initialState: CatalogPageSchema = {
  isLoading: false,
  error: undefined,
  quizList: []
}

export const catalogPageSlice = createSlice({
  name: 'catalogPageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizList.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchQuizList.fulfilled, (state, action) => {
        state.quizList = action.payload
        state.isLoading = false
      })
      .addCase(fetchQuizList.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
  }
})

export const { actions: catalogPageActions, reducer: catalogPageReducer } = catalogPageSlice
