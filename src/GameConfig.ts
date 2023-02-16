import { Difficulty } from './enums/Difficulty'
import { Region } from './enums/Region'
import { Categories } from './enums/Categories'

export const DIFFICULTY_POINTS = { easy: 1, medium: 3, hard: 5 }
export const START_TIME: number = 10
export const TOTAL_QUESTIONS: number = 9

export type GameConfig = {
  categories: Categories
  difficulty: Difficulty
  playerName: string
  region: Region
}
