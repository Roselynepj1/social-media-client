describe('Unsuccessful user login', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000)
  })

  it('should alert an error when user logs in with invalid credentials', () => {
    cy.openLoginForm()
    cy.loginUser(Cypress.env('wrong-user'), Cypress.env('wrong-password'))
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain(
        'Either your username was not found or your password is incorrect',
      )
    })
  })
})
