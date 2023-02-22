import { Category } from './enums/Category'
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
  { id: Category.Arts_And_Litterature, value: 'Art & Literature' },
  { id: Category.Film_And_TV, value: 'Film & Tv' },
  { id: Category.Food_And_Drink, value: 'Food & Drink' },
  { id: Category.General_Knowledge, value: 'General Knowledge' },
  { id: Category.Geography, value: 'Geography' },
  { id: Category.History, value: 'History' },
  { id: Category.Music, value: 'Music' },
  { id: Category.Science, value: 'Science' },
  { id: Category.Society_And_Culture, value: 'Society And Culture' },
  { id: Category.Sport_And_Leisure, value: 'Sport And Leisure' },
]
