import { loadFeature, defineFeature } from 'jest-cucumber'
import { Category } from '../../enums/Category'

const feature = loadFeature('./specs/features/category.feature')

export const getCategory = (category: string): Category => {
  let value = category as Category
  if (value === undefined) throw new Error('Category not found')

  return value
}

defineFeature(feature, (test) => {
  let pickedCategory: Category

  test('Pick a category', ({ given, when, then }) => {
    given(/^category: ([a-zA-Z]+)$/, (category) => {
      pickedCategory = getCategory(category)
    })

    when('Check if the category is correct', () => {
      if (pickedCategory !== Category.Music)
        throw new Error('Category not found')
    })

    then(/^The picked category should be: ([a-zA-Z]+)$/, (expected) => {
      expect(pickedCategory).toBe(expected)
    })
  })
})
