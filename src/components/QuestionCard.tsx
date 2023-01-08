import React from 'react'

import { AnswerObject } from '../App'
import styled from 'styled-components'

const START_TIME = 10

function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue
}

type Props = {
  question: string
  answers: string[]
  callback: (answer: string) => any
  isWaitingForNextQuestion: boolean
  userAnswer: AnswerObject | undefined
  questionNum: number
  totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
  isWaitingForNextQuestion,
}) => {
  const [countdown, setCountdown] = React.useState(START_TIME)

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (countdown < 1) {
        callback('ts')
        setCountdown(START_TIME)
      } else if (!isWaitingForNextQuestion) {
        setCountdown((value) => value - 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [callback, countdown, isWaitingForNextQuestion])

  const handleClick = (answer: string) => {
    callback(answer)
    setCountdown(START_TIME)
  }

  return (
    <QuestionContainer>
      <QuestionNumber>
        Question: {questionNum} / {totalQuestions}
      </QuestionNumber>

      <Question>{question}</Question>
      <Ul>
        {answers?.map((answer) => (
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
              height: '20px',
              transition: 'all 1s linear',
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
`

const Question = styled.h3`
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
