describe('Successful user login', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000)
  })

  it('should login user with correct credentials', () => {
    cy.openLoginForm()
    cy.loginUser(Cypress.env('user-email'), Cypress.env('user-password'))
    cy.url().should('include', '/?view=profile')
  })
})
