import { Answer, Question } from '@/shared/interfaces/Quiz.ts'
import React, { memo, useEffect, useState } from 'react'
import { Card, Grid, useMantineTheme } from '@mantine/core'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { createElement as syntaxCreateElement } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CurrentAnswer {
  id: string
  position: number
  value: string
}

interface WriteAnswerProps {
  question: Question
  readyToCheck: (value: boolean) => void
}

export const WriteAnswer = memo((props: WriteAnswerProps) => {
  const { question, readyToCheck } = props

  const { colorScheme } = useMantineTheme()

  const [answerOptions, setAnswerOptions] = useState(question.answerOptions)
  const [answers, setAnswers] = useState<CurrentAnswer[]>([])
  const [blankCount, setBlankCount] = useState(0)

  const onSelectAnswerOption = (answer: Answer) => {
    return () => {
      if (answers.length === blankCount) {
        return
      }

      setAnswerOptions(prev => prev.filter((el => el.id !== answer.id)))

      setAnswers(prev => {
        const emptyPosition = findFirstEmptyBlank(answers, blankCount)
        return [...prev, { ...answer, position: emptyPosition }]
      })

      // изза особенности работы хуков имеет старое значение answers
      if (answers.length + 1 === blankCount) {
        readyToCheck(true)
      }
    }
  }

  const onClickRemoveAnswer = (e: React.MouseEvent<HTMLSpanElement>) => {
    const classNames = (e.target as any)['className'] as string
    if (!classNames.includes('answerField')) {
      return
    }

    const answerId = classNames.split(' ')[1]?.split('__')[1]
    if (!answerId) {
      return
    }

    const answerOption = question.answerOptions.find(el => el.id === answerId)
    const currentAnswerPosition = answers.find(el => el.id === answerId)
    if (!answerOption || !currentAnswerPosition) {
      return
    }

    setAnswers(prev => prev.filter(el => el.id !== answerId))

    setAnswerOptions(prev => [answerOption, ...prev])
  }

  useEffect(() => {
    setBlankCount(getCountBlank(question.value))
  }, [question.value])

  useEffect(() => {
    setAnswers([])
    setAnswerOptions(question.answerOptions)
  }, [question.answerOptions, question.value])

  return (
    <>
      <SyntaxHighlighter
        renderer={defaultRenderer(answers)}
        children={question.value}
        onClick={onClickRemoveAnswer}
        wrapLongLines={true}
        language="typescript"
        showLineNumbers={true}
        style={colorScheme === 'dark' ? oneDark : undefined}
      />
      <Grid>
        {
          answerOptions.map(answerOption => (
            <Grid.Col key={answerOption.id} span={4}>
              <Card
                onClick={onSelectAnswerOption(answerOption)}
                withBorder
                radius="md"
                p={0}
                className="card"
              >
                { answerOption.value }
              </Card>
            </Grid.Col>
          ))
        }
      </Grid>
    </>
  )
})

const FORMAT_BLANK_REGEX = /__(\d+)__/g

function getCountBlank(value: string) {
  return (value.match(FORMAT_BLANK_REGEX) || []).length
}

function isFieldForAnswer(value: string) {
  return FORMAT_BLANK_REGEX.test(value)
}

function findFirstEmptyBlank(currentAnswers: CurrentAnswer[], blankCount: number): number {
  for (let position = 1; position <= blankCount; position++) {
    const candidate = currentAnswers.find(el => el.position === position)
    if (!candidate) {
      return position
    }
  }
  return 0
}

function replaceBlank(row: rendererNode, currentAnswers: CurrentAnswer[]) {
  row.children?.map((node, idx) => {
    if (!node.children) {
      return
    }

    const tokenValue = node.children[0].value

    if (!tokenValue || typeof tokenValue !== 'string') {
      return
    }

    // Соответствует ли токен формату __DIGIT__
    if (!isFieldForAnswer(tokenValue)) {
      return
    }

    // Если перед пробел, добавляем предыдущему токену пробел
    if (tokenValue.startsWith(' ')) {
      if (!row.children || !row.children[idx - 1].children) {
        return
      }

      const prevElement = row.children[idx - 1].children![0]
      prevElement.value += ' '
    }

    const fieldPosition = parseInt(tokenValue.replaceAll('__', ''))

    // Есть ли в текущих ответах ответ с данной позицией
    const currentPositionAnswer = currentAnswers.find(answer => answer.position === fieldPosition)

    if (currentPositionAnswer) {
      // Устанавливаем значение текущему элементу
      node.children[0].value = currentPositionAnswer.value + ' '
      // Указываем id ответа для дальнейшей возможности удалить его по этому же id
      node.properties?.className.push('answerField', 'answer__' + currentPositionAnswer.id)
    } else {
      node.children[0].value = '        '
      node.properties?.className.push('answerField')
    }

  })

  return row
}

function defaultRenderer(currentAnswers: CurrentAnswer[]) {
  return (props: rendererProps) => {
    return props.rows.map((row: rendererNode, idx: number) => {
      return syntaxCreateElement({
        node: replaceBlank(row, currentAnswers),
        key: `code-segment${idx}`,
        ...props
      })
    })
  }
}
