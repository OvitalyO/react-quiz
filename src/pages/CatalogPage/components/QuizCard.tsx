import { QuizInfo } from '@/shared/interfaces/Quiz'
import { routePaths } from '@/shared/routePaths/routePaths'
import {
  Card,
  Text,
  Image,
  rem,
  createStyles,
  Button, Center,
} from '@mantine/core'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

interface QuizCardProps {
  quiz: QuizInfo
}

export const QuizCard = memo((props: QuizCardProps) => {
  const { quiz } = props

  const { classes } = useStyles()

  const navigate = useNavigate()

  const onClickQuiz = (id: string) => {
    return () => {
      navigate(routePaths.quiz(id))
    }
  }

  return (
    <Card withBorder padding="md" radius="md">
      <Card.Section>
        <Image src='https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg' height={100} />
      </Card.Section>
      <Text className={classes.title} fw={500} component="a">
        <Center>
          { quiz.title }
        </Center>
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={4}>
        Описание ОписаниеОписаниеОписа ниеОписани еОписа ниеОписаниеОписаниеОписаниеОписаниеО писаниеОпис аниеОписаниеОписан иеОписание ОписаниеОписаниеОписание Описание
      </Text>

      <Center maw={400} h={60} mx="auto">
        <Button onClick={onClickQuiz(quiz.id)} radius="md" variant='light' className={classes.button}>Пройти</Button>
      </Center>
    </Card>
  )
})

const useStyles = createStyles((theme) => ({
  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },
  button: {
    width: '130%'
  }
}))
