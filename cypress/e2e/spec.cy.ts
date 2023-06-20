describe('Lets quiz', () => {
  it('Testing one game round', () => {
    cy.visit('http://localhost:3000/')

    cy.contains(`Let's Quiz`).click()

    // Intro

    cy.get('.input').type('Name')
    cy.get('select.select-difficulty').select('easy')
    cy.get('select.select-region').select('SE')
    cy.get('.select-category').click()
    cy.get('.select-categoryOption').first().click()
    cy.get('.start-quiz').click()

    // The game

    for (let questionNumber = 1; questionNumber <= 8; questionNumber++) {
      cy.get('p').should('contain', `Question: ${questionNumber} / 9`)
      cy.get('.answer-button').first().click()
      cy.get('.next-question').first().click({ multiple: true })
      cy.wait(5000)
    }

    cy.get('p').should('contain', 'Question: 9 / 9')
    cy.get('.answer-button').first().click()

    // Finish

    cy.get('.finish-game').click()
    cy.get('h3').should('contain', 'Quiz is complete')
  })
})
