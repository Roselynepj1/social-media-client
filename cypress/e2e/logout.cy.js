describe('Logout functionality', () => {
  const loginUser = () => {
    cy.visit('/')
    cy.wait(2000)
    cy.openLoginForm()
    cy.loginUser(Cypress.env('user-email'), Cypress.env('user-password'))
    cy.wait(2000)
    cy.url().should('include', '/?view=profile')
  }

  beforeEach(() => {
    loginUser()
  })

  it('should login the user and then log the user out', () => {
    cy.wait(4000) // Wait for 4 seconds
    cy.logoutUser()
    cy.window().then((window) => {
      const authToken = window.localStorage.getItem('token')
      expect(authToken).to.be.null
    })
  })
})
