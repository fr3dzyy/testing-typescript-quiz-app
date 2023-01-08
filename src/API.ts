import { shuffleArray } from './utils'
import { Categories } from './enums/Categories'
import { Difficulty } from './enums/Difficulty'
import { Region } from './enums/Region'

export type Question = {
  category: string
  type: string
  difficulty: string
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}

export type QuestionState = Question & { answers: string[] }

const randomDifficulties = (difficulty: string) => {
  const difficulties = ['easy', 'medium', 'hard']
  if (difficulty === 'random') {
    return difficulties[Math.floor(Math.random() * 3)]
  }
  return difficulty
}

export const fetchQuestions = async (
  // amount: number,
  categories: Categories,
  difficulty: Difficulty = Difficulty.EASY,
  limit: Number = 0,
  region: Region = Region.GB
): Promise<QuestionState[]> => {
  const url = `https://the-trivia-api.com/api/questions?limit=${limit}&region=${region}&categories=${categories}&difficulty=${randomDifficulties(
    difficulty
  )}`
  const quizData = await (await fetch(url)).json()
  console.log(difficulty)
  console.log(url)
  console.log(quizData)
  console.log(Categories)

  return quizData.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrectAnswers,
      question.correctAnswer,
    ]),
  }))
}
