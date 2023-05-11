import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../../App'

describe('Testing elements', () => {
  test('check the headline text', () => {
    render(<App />)
    const headlineText = screen.getByText(/Let's quiz/i)
    expect(headlineText).toBeInTheDocument()
  })

  test('check if button is disabled', () => {
    render(<App />)
    const startButton = screen.getByText('Start Quiz')
    expect(startButton).toBeDisabled()
  })

  test('check if button is clickable', () => {
    render(<App />)
    // Get nameInput
    const nameInput = screen.getByPlaceholderText(/Enter your name/i)

    // Get startButton
    const startButton = screen.getByText('Start Quiz')

    // Get CategoryButton
    const categoryButton = screen.getByText('Select Category')

    // Set nameValue
    const nameValue = 'Fred'

    // Enter nameInput
    fireEvent.change(nameInput, { target: { value: nameValue } })

    // Click categoryButton
    fireEvent.click(categoryButton)

    // Get 3 categoryButtons
    const categories = screen.getAllByRole('button')

    // Select the second button
    const secondCategory = categories[1]

    // Click on the second button
    fireEvent.click(secondCategory)

    expect(startButton).not.toBeDisabled()
  })
})
