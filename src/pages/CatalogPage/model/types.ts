import { QuizInfo } from '@/shared/interfaces/Quiz'

export interface CatalogPageSchema {
  isLoading: boolean
  error?: string
  quizList: QuizInfo[]
}
