import { catalogPageReducer } from '@/pages/CatalogPage/model/slice'
import { quizPageReducer } from '@/pages/QuizPage/model/slice'
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'

export const createReduxStore = () => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    catalogPage: catalogPageReducer,
    quizPage: quizPageReducer
  }

  return configureStore({
    reducer: rootReducer
  })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
