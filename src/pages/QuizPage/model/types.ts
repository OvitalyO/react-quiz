import { Quiz } from '@/shared/interfaces/Quiz'

// Todo to page
export interface QuizPageSchema {
  isLoading: boolean
  error?: string
  quizData?: Quiz
  countCorrectAnswers: number
  currentQuestionIdx: number
}
