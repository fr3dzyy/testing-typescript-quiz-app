import React, { useCallback, useEffect } from 'react'

import styled from 'styled-components'

import { AnswerObject } from '../App'
import { GameConfig, START_TIME } from '../GameConfig'
import { fetchQuestion, Question } from '../API'

function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue
}

type QuestionCardProps = {
  gameConfig: GameConfig
  callback: (
    question: Question,
    answer: string,
    secondsleft: number,
    difficulty: string
  ) => void
  isWaitingForNextQuestion: boolean
  userAnswer: AnswerObject | undefined
  questionNum: number
  totalQuestions: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  gameConfig,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
  isWaitingForNextQuestion,
}) => {
  const [countdown, setCountdown] = React.useState(START_TIME)
  const [question, setQuestion] = React.useState<Question | undefined>()
  const [hasError, setHasError] = React.useState<boolean>(false)

  const getQuestion = useCallback(async () => {
    try {
      const newQuestion = await fetchQuestion(
        gameConfig.category,
        gameConfig.difficulty,
        gameConfig.region
      )
      setQuestion(newQuestion)
    } catch (error) {
      setHasError(true)
    }
  }, [gameConfig])

  useEffect(() => {
    if (questionNum === -1) {
      return
    }
    setCountdown(START_TIME)
    getQuestion()
    setQuestion(undefined)
  }, [getQuestion, questionNum])

  useEffect(() => {
    if (!question) {
      return
    }

    const interval = setInterval(() => {
      if (countdown < 1) {
        callback(question, 'No answer', 0, question.difficulty)
        setCountdown(START_TIME)
      } else if (!isWaitingForNextQuestion) {
        setCountdown((value) => value - 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [callback, countdown, isWaitingForNextQuestion, question])

  const handleClick = (answer: string) => {
    if (!question) {
      return
    }
    callback(question, answer, countdown, question?.difficulty)
    setCountdown(START_TIME)
  }

  if (hasError) return <ErrorText>ERROR - API NOT AVAILABLE</ErrorText>

  if (!question) return <H3>Loading question!</H3>

  return (
    <QuestionContainer>
      <QuestionNumber>
        Question: {(questionNum += 1)} / {totalQuestions}
      </QuestionNumber>

      <QuestionTitle>{question.question}</QuestionTitle>
      <Ul>
        {question.answers.map((answer) => (
          <li key={answer}>
            <Button
              disabled={!!userAnswer}
              value={answer}
              onClick={() => handleClick(answer)}
            >
              <p>{answer}</p>
            </Button>
          </li>
        ))}
      </Ul>
      {!isWaitingForNextQuestion && (
        <>
          <TimeLeft>Time left: {countdown}</TimeLeft>
          <CountDownDiv
            style={{
              width: `${percentage(countdown, START_TIME)}% `,
              background: countdown < 4 ? 'red' : 'black',
            }}
          />
        </>
      )}
    </QuestionContainer>
  )
}

export default QuestionCard

const Button = styled.button`
  border: none;
  border-radius: 5px;
  font-size: larger;
  height: auto;
  margin: 5px;
  padding: 10px;
  width: 150px;
`

const CountDownDiv = styled.div`
  margin: 15px 0 15px;
  height: 20px;
  transition: all 1s linear;
`

const H3 = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
`

const ErrorText = styled(H3)`
  background-color: black;
  color: white;
  padding: 5px 25px 5px;
`

const QuestionTitle = styled.h3`
  font-size: 30px;
  margin: 25px 0 25px;
`

const QuestionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 30px;
  max-width: 75%;
`

const QuestionNumber = styled.p`
  font-size: 20px;
`

const TimeLeft = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;
  /* width: 200px; */

  @media (max-width: 700px) {
    flex-direction: column;
  }
`
