
export type QuestionType = 'SELECT_ONE_OF_3_ANSWER' | 'WRITE_ANSWER'

export interface QuizInfo {
  id: string
  title: string
  questionCount: number
}

export interface Quiz {
  id: string
  title: string
  questions: Question[]
}

export interface Question {
  id: string
  type: QuestionType
  title?: string
  description?: string
  value: string // строка с кодом
  answerOptions: Answer[]
}

export interface Answer {
  id: string
  value: string
}
