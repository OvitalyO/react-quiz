import { CatalogPageSchema } from '@/pages/CatalogPage/model/types'
import { QuizPageSchema } from '@/pages/QuizPage/model/types'

export interface StateSchema {
  catalogPage: CatalogPageSchema
  quizPage: QuizPageSchema
}

export interface ThunkConfig<T> {
  rejectValue: T
  state: StateSchema
}
