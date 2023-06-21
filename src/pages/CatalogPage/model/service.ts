import { ThunkConfig } from '@/app/providers/store/config/StateSchema'
import { QuizInfo } from '@/shared/interfaces/Quiz.ts'
import { createAsyncThunk } from '@reduxjs/toolkit'
// import { $api } from '@/shared/api/api'
// import { REST_ENDS } from '@/shared/api/config'

// https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk

const fetchQuizListMock = [
  {
    id: '1',
    title: 'Квиз номер один',
    questionCount: 10
  },
  {
    id: '2',
    title: 'Квиз номер 2',
    questionCount: 12
  },
  {
    id: '3',
    title: 'Квиз номер 3',
    questionCount: 10
  },
  {
    id: '4',
    title: 'Квиз номер 4',
    questionCount: 10
  },
  {
    id: '5',
    title: 'Квиз номер 5',
    questionCount: 10
  },
  {
    id: '6',
    title: 'Квиз номер 6',
    questionCount: 10
  },
  {
    id: '7',
    title: 'Квиз номер 7',
    questionCount: 10
  },
  {
    id: '8',
    title: 'Квиз номер 8',
    questionCount: 10
  }
]


// FetchQuizListResponse что возвращает функция
// void что принимает функция
// ThunkConfig<string> указывает тип возвращаемой ошибки
export const fetchQuizList = createAsyncThunk<QuizInfo[], void, ThunkConfig<string>>(
  'catalogPage/fetchQuizList',
  async (_, thunkAPI) => {
    try {

      // const response = await $api.get(REST_ENDS.fetchQuizList, {
      //   params: {
      //
      //   }
      // })

      // if (!response.data) {
      //   throw Error() // Отработает ближайший try-catch
      // }
      //
      // return response.data

      return fetchQuizListMock

    } catch (e) {
      return thunkAPI.rejectWithValue('Произошла ошибка при загрузке всех квизов') // Словит любую ошибку, в т.ч. которую мы сами вызываем
    }
  }
)
