import { Categories } from './enums/Categories'
import { Difficulty } from './enums/Difficulty'
import { Region } from './enums/Region'

export type Question = {
  answers: string[]
  category: string
  correctAnswer: string
  difficulty: string
  incorrectAnswers: string[]
  type: string
  question: string
}

export type QuestionState = Question & { answers: string[] }

const randomDifficulties = (difficulty: string) => {
  const difficulties = ['easy', 'medium', 'hard']
  if (difficulty === 'random') {
    return difficulties[Math.floor(Math.random() * 3)]
  }
  return difficulty
}

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5)
}

export const fetchQuestion = async (
  categories: Categories,
  difficulty: Difficulty = Difficulty.EASY,
  region: Region = Region.GB
): Promise<QuestionState> => {
  const url = `https://the-trivia-api.com/api/questions?limit=1&region=${region}&categories=${categories}&difficulty=${randomDifficulties(
    difficulty
  )}`

  const quizData = await (await fetch(url)).json()
  console.log(url)

  const formattedQuestion = quizData.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrectAnswers,
      question.correctAnswer,
    ]),
  }))
  return formattedQuestion[0]
}
