import { Categories } from './enums/Categories'
import { Difficulty } from './enums/Difficulty'
import { Region } from './enums/Region'

export const difficultiesOptions = [
  { id: Difficulty.EASY, value: 'Easy' },
  { id: Difficulty.MEDIUM, value: 'Medium' },
  { id: Difficulty.HARD, value: 'Hard' },
  { id: 'random', value: 'Random' },
]

export const regionOptions = [
  { id: Region.SE, value: 'SE' },
  { id: Region.GB, value: 'GB' },
]

export const categoryOptions = [
  { id: Categories.Arts_And_Litterature, value: 'Art & Literature' },
  { id: Categories.Film_And_TV, value: 'Film & Tv' },
  { id: Categories.Food_And_Drink, value: 'Food & Drink' },
  { id: Categories.General_Knowledge, value: 'General Knowledge' },
  { id: Categories.Geography, value: 'Geography' },
  { id: Categories.History, value: 'History' },
  { id: Categories.Music, value: 'Music' },
  { id: Categories.Science, value: 'Science' },
  { id: Categories.Society_And_Culture, value: 'Society And Culture' },
  { id: Categories.Sport_And_Leisure, value: 'Sport And Leisure' },
]
