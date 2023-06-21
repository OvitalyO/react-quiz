import { fetchQuiz } from '@/pages/QuizPage/model/service.ts'
import { quizPageActions } from '@/pages/QuizPage/model/slice.ts'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch.ts'
import { IconLoader3 } from '@tabler/icons-react'
import {
  selectCountCorrectAnswers, selectCurrentQuestionIdx,
  selectLoading, selectQuestions,
  selectQuizTitle,
} from '../model/selectors'
import { useSelector } from 'react-redux'
import { WriteAnswer } from '../components/WriteAnswer'
import { Button, Container, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'

const QuizPage = () => {

  const dispatch = useAppDispatch()

  const isLoading = useSelector(selectLoading)
  const quizTitle = useSelector(selectQuizTitle)
  const countCorrectAnswers = useSelector(selectCountCorrectAnswers)
  const currentQuestionIdx = useSelector(selectCurrentQuestionIdx)
  const questions = useSelector(selectQuestions)

  const [showResults, setShowResults] = useState(false)
  const [readyToCheck, setReadyToCheck] = useState(false)

  const onClickNext = () => {
    dispatch(quizPageActions.incQuestionIdx())
  }

  const onClickFinish = () => {
    setShowResults(true)
  }

  const onReadyToCheck = (value: boolean) => {
    setReadyToCheck(value)
  }

  useEffect(() => {
    dispatch(fetchQuiz('1'))
  }, [dispatch])

  if (isLoading) {
    return (
      <Container>
        <IconLoader3 />
      </Container>
    )
  }

  if (!questions?.length) {
    return (
      <Container>
        <Title>{ quizTitle }</Title>
        <Text>Вопросы отсутствуют</Text>
      </Container>
    )
  }

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIdx]

    // TODO
    switch (currentQuestion.type) {
      case 'WRITE_ANSWER':
        return (
          <WriteAnswer
            question={currentQuestion}
            readyToCheck={onReadyToCheck}
          />
        )
    }

  }


  if (showResults) {
    return (
      <Container>
        <Title>{ quizTitle }</Title>
        <Title>Количество правильных ответов: { countCorrectAnswers }</Title>
        <Title>End</Title>
      </Container>
    )
  }

  return (
    <Container>
      <Title>{ quizTitle }</Title>
      <Text>Вопрос { currentQuestionIdx + 1 } из { questions.length }</Text>

      { renderQuestion() }

      {
        currentQuestionIdx !== questions.length - 1
          ? <Button onClick={onClickNext} disabled={!readyToCheck} variant={'outline'}>Следующий</Button>
          : <Button onClick={onClickFinish} disabled={!readyToCheck} variant={'gradient'}>Завершить</Button>
      }


    </Container>
  )
}

export default QuizPage
