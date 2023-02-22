import { Difficulty } from './enums/Difficulty'
import { Region } from './enums/Region'
import { Category } from './enums/Category'

export const DIFFICULTY_POINTS = { easy: 1, medium: 3, hard: 5 }
export const START_TIME: number = 10
export const TOTAL_QUESTIONS: number = 9

export type GameConfig = {
  category: Category
  difficulty: Difficulty
  playerName: string
  region: Region
}
