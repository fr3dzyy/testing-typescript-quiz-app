import { loadFeature, defineFeature } from 'jest-cucumber'

const feature = loadFeature('./specs/features/calc.feature')

export function AddTwoNumbers(x: number, y: number): number {
  return x + y
}

defineFeature(feature, (test) => {
  let calcResult: number = 0
  let x: number
  let y: number

  test('Add two numbers', ({ given, when, then }) => {
    given(/^x: (\d+) and y: (\d+)$/, (arg0, arg1) => {
      x = parseInt(arg0)
      y = parseInt(arg1)
    })

    when('Calling the function to add two numbers', () => {
      calcResult = AddTwoNumbers(x, y)
    })

    then(/^the result should be (\d+)$/, (expected) => {
      expect(calcResult).toBe(parseInt(expected))
    })
  })
})
