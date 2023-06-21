import { ThunkConfig } from '@/app/providers/store/config/StateSchema'
import { Quiz } from '@/shared/interfaces/Quiz'
import { createAsyncThunk } from '@reduxjs/toolkit'

const mock: Quiz  = {
  id: '1212',
  title: 'Название квиза',
  questions: [
    {
      type: 'WRITE_ANSWER',
      id: '1',
      value: `const t: __1__ = 12\n__2__ test = __3__ => {\n   console.log('test')__4__;\n}`,
      answerOptions: [
        {
          id: '1a',
          value: 'const'
        },
        {
          id: '2a',
          value: 'let'
        },
        {
          id: '3a',
          value: 'var'
        },
        {
          id: '4a',
          value: 'number'
        },
        {
          id: '5a',
          value: '()'
        }
      ]
    },
    {
      type: 'WRITE_ANSWER',
      id: '2',
      value: `const D: __1__ = 12\n__2__ test = __3__ => {\n   console.log('question2')__4__;\n}`,
      answerOptions: [
        {
          id: '1a',
          value: 'const'
        },
        {
          id: '2a',
          value: 'let'
        },
        {
          id: '3a',
          value: 'var'
        },
        {
          id: '4a',
          value: 'number'
        },
        {
          id: '5a',
          value: '()'
        }
      ]
    }
  ]
}

export const fetchQuiz = createAsyncThunk<Quiz, string, ThunkConfig<string>>(
  'quizPage/fetchQuiz',
  async (id, thunkAPI) => {
    try {

      console.log(id)
      return mock

    } catch (e) {
      return thunkAPI.rejectWithValue('Произошла ошибка при загрузке квиза')
    }
  }
)
