import { Difficulty } from '../enums/Difficulty'
import { Region } from '../enums/Region'
import { Categories } from '../enums/Categories'

export type GameConfig = {
  categories: Categories
  difficulty: Difficulty
  playerName: string
  region: Region
}
