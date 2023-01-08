import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('check the headline text', () => {
  render(<App />)
  const headlineText = screen.getByText(/Let's quiz/i)
  expect(headlineText).toBeInTheDocument()
})
