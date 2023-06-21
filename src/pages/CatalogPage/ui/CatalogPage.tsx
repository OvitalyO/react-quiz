import {
  selectLoading,
  selectQuizList,
} from '@/pages/CatalogPage/model/selectors.ts'
import { fetchQuizList } from '@/pages/CatalogPage/model/service.ts'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { IconLoader3 } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { QuizCard } from '../components/QuizCard'
import { Container, SimpleGrid } from '@mantine/core'
import { useEffect } from 'react'

const CatalogPage = () => {

  const dispatch = useAppDispatch()
  const quizList = useSelector(selectQuizList)
  const isLoading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(fetchQuizList())
  }, [dispatch])

  if (isLoading) {
    return (
      <Container>
        <IconLoader3 />
      </Container>
    )
  }

  return (
    <Container>
      <SimpleGrid cols={3} spacing="xl" verticalSpacing="xl">
        {
          quizList.map((quiz) => (
            <QuizCard quiz={quiz} key={quiz.id} />
          ))
        }
      </SimpleGrid>
    </Container>
  )
}

export default CatalogPage
