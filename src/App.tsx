import React from 'react'

import styled from 'styled-components'
import QuestionCard from './components/QuestionCard'
import IntroForm from './components/Introform'

import { Question } from './API'
import { DIFFICULTY_POINTS, TOTAL_QUESTIONS } from './GameConfig'
import { GameConfig } from './GameConfig'
import { Difficulty } from './enums/Difficulty'

export type AnswerObject = {
  answer: string
  correct: boolean
  correctAnswer: string
  difficulty: Difficulty
  question: string
  time: number
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(-1)
  const [complete, setComplete] = React.useState<boolean>(false)
  const [gameConfig, setGameConfig] = React.useState<GameConfig>()
  const [gameOver, setGameOver] = React.useState<boolean>(true)
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([])

  const startQuiz = async (gameConfig: GameConfig) => {
    setGameConfig(gameConfig)
    setComplete(false)
    setCurrentQuestion(0)
    setGameOver(false)
  }

  const checkAnswer = (
    question: Question,
    answer: string,
    secondsleft: number,
    difficulty: string
  ) => {
    if (!gameOver) {
      const correct = question.correctAnswer === answer

      const answerObject = {
        question: question.question,
        correctAnswer: question.correctAnswer,
        answer,
        correct,
        difficulty: difficulty as Difficulty,
        time: secondsleft,
      }

      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const handleNext = () => {
    if (currentQuestion < TOTAL_QUESTIONS - 1)
      setCurrentQuestion((prev) => prev + 1)
    else setComplete(true)
  }

  function calculateFinalScore(answers: AnswerObject[]) {
    let finalScore = 0
    let totalRightAnswers = 0
    let longestStreak = 0
    let currentStreak = 0

    for (let i = 0; i < answers.length; i++) {
      const a = answers[i]

      if (a.correct) {
        finalScore += DIFFICULTY_POINTS[a.difficulty] * a.time
        currentStreak++
        totalRightAnswers++
      }

      if (!a.correct || i + 1 === answers.length) {
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak
        }
        currentStreak = 0
      }
    }
    if (longestStreak >= 3) {
      finalScore += totalRightAnswers * longestStreak
    }
    return finalScore
  }

  const isWaitingForNextQuestion =
    !gameOver && !complete && !!userAnswers[currentQuestion]

  return (
    <>
      <Container>
        <H1 onClick={() => window.location.reload()}>Let's Quiz</H1>
        {complete && <QuizComplete>Quiz is complete</QuizComplete>}

        {gameOver && <IntroForm onSubmit={startQuiz} />}
        {complete && (
          <>
            <ScoreParagraph>Your score is:</ScoreParagraph>
            <ScoreParagraph>{calculateFinalScore(userAnswers)}</ScoreParagraph>
          </>
        )}

        {!gameOver && !complete && gameConfig && (
          <>
            <PlayerName>Player-name: {gameConfig?.playerName}</PlayerName>

            <QuestionCard
              questionNum={currentQuestion}
              gameConfig={gameConfig}
              totalQuestions={TOTAL_QUESTIONS}
              userAnswer={
                userAnswers ? userAnswers[currentQuestion] : undefined
              }
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
