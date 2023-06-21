import { StateSchema } from '@/app/providers/store/config/StateSchema'

export const selectLoading = (state: StateSchema) => state.catalogPage.isLoading
export const selectQuizList = (state: StateSchema) => state.catalogPage.quizList
