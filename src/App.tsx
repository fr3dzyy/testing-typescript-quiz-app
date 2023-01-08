import React from 'react'

import styled from 'styled-components'
import QuestionCard from './components/QuestionCard'
import IntroForm from './components/Introform'

import { fetchQuestions, QuestionState } from './API'
import { TOTAL_QUESTIONS } from './config'
import { GameConfig } from './interfaces/GameConfig'

export type AnswerObject = {
  answer: string
  correct: boolean
  correctAnswer: string
  question: string
}

export default function App() {
  const [complete, setComplete] = React.useState<boolean>(false)
  const [gameConfig, setGameConfig] = React.useState<GameConfig>()
  const [gameOver, setGameOver] = React.useState<boolean>(true)
  const [number, setNumber] = React.useState<number>(0)
  const [score, setScore] = React.useState<number>(0)
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([])
  const [questions, setQuestions] = React.useState<QuestionState[]>([])

  const startQuiz = async (gameConfig: GameConfig) => {
    const newQuestions = await fetchQuestions(
      gameConfig.categories,
      gameConfig.difficulty,
      TOTAL_QUESTIONS,
      gameConfig.region
    )
    setGameConfig(gameConfig)
    setComplete(false)
    setQuestions(newQuestions)
    setGameOver(false)
  }

  const checkAnswer = (answer: string) => {
    if (!gameOver) {
      const correct = questions[number].correctAnswer === answer
      if (correct) setScore((prev) => prev + 1)
      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correctAnswer,
        answer,
        correct,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const handleNext = () => {
    if (number < TOTAL_QUESTIONS - 1) setNumber((prev) => prev + 1)
    else setComplete(true)
  }

  const isWaitingForNextQuestion =
    !gameOver && !complete && !!userAnswers[number]

  return (
    <>
      <Container>
        <H1 onClick={() => window.location.reload()}>Let's Quiz</H1>
        {complete && <QuizComplete>Quiz is complete</QuizComplete>}

        {gameOver && <IntroForm onSubmit={startQuiz} />}
        {complete && (
          <>
            <ScoreParagraph>Your score is:</ScoreParagraph>
            <ScoreParagraph> {score} / 9</ScoreParagraph>
          </>
        )}

        {!gameOver && !complete && (
          <>
            <PlayerName>Player-name: {gameConfig?.playerName}</PlayerName>

            <QuestionCard
              questionNum={number + 1}
              question={questions[number].question}
              answers={questions[number].answers}
              totalQuestions={TOTAL_QUESTIONS}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
              isWaitingForNextQuestion={isWaitingForNextQuestion}
            />
          </>
        )}

        {isWaitingForNextQuestion && (
          <NextQuestionBtn onClick={handleNext}>Next Question</NextQuestionBtn>
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  align-items: center;
  background-color: #35a6e8;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: auto;
  width: 100%;
`

const H1 = styled.h1`
  cursor: pointer;
  font-size: 50px;
  margin: 5%;
`

const NextQuestionBtn = styled.button`
  font-size: larger;
  height: 50px;
  margin: 25px;
  width: 200px;
`

const PlayerName = styled.h2``

const QuizComplete = styled.h3`
  font-size: 35px;
  margin-bottom: 25px;
`

const ScoreParagraph = styled.p`
  font-size: 25px;
  margin: 5px;
`
