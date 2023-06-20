import React, { useEffect } from 'react'

import styled from 'styled-components'
import IntroForm from './components/Introform'
import QuestionCard from './components/QuestionCard'

import { Question } from './API'
import { DIFFICULTY_POINTS, GameConfig, TOTAL_QUESTIONS } from './GameConfig'
import { categoryOptions } from './options'
import { Category } from './enums/Category'
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
  const [questionCountdown, setQuestionCountdown] = React.useState(3)
  const [isReady, setIsReady] = React.useState(false)

  const wasLastQuestion = currentQuestion === TOTAL_QUESTIONS - 1

  const threeRandomCategories = [...categoryOptions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

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

  const handleNext = (category?: string) => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      if (category) {
        setGameConfig((gc) => {
          return { ...gc, category } as GameConfig
        })
      }
      setIsReady(true)
      setCurrentQuestion((prev) => prev + 1)
    } else setComplete(true)
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (questionCountdown < 1) {
        setIsReady(false)
        setQuestionCountdown(3)
      } else if (isReady) {
        setQuestionCountdown((value) => value - 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [questionCountdown, isReady])

  const isWaitingForNextQuestion =
    !gameOver && !complete && !!userAnswers[currentQuestion]

  const wasCorrect = userAnswers[currentQuestion]?.correct
  if (isReady) {
    return (
      <Container>
        <H1>Get ready for the next question</H1>
        <QuestionCountdown> {questionCountdown}</QuestionCountdown>
      </Container>
    )
  }
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
        {isWaitingForNextQuestion &&
          !wasCorrect &&
          !isReady &&
          !wasLastQuestion && (
            <NextQuestionBtn
              className="next-question"
              onClick={() => handleNext()}
            >
              Next Question
            </NextQuestionBtn>
          )}

        {isWaitingForNextQuestion && wasLastQuestion && (
          <NextQuestionBtn className="finish-game" onClick={() => handleNext()}>
            Finish game
          </NextQuestionBtn>
        )}

        {isWaitingForNextQuestion &&
          wasCorrect &&
          !isReady &&
          !wasLastQuestion &&
          threeRandomCategories.map((category) => (
            <CategoryButton
              className="next-question"
              key={category.id}
              onClick={() => handleNext(category.id as Category)}
            >
              {category.value}
            </CategoryButton>
          ))}
      </Container>
    </>
  )
}

const CategoryButton = styled.button`
  border: none;
  border-radius: 5px;

  font-size: larger;
  height: auto;
  margin: 5px;
  padding: 10px;
  width: 150px;
`

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

const QuestionCountdown = styled.p`
  font-size: 4rem;
`

const ScoreParagraph = styled.p`
  font-size: 25px;
  margin: 5px;
`
