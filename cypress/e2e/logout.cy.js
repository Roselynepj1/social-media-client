describe('Logout functionality', () => {
  const loginUser = () => {
    cy.visit('/')
    cy.wait(2000)
    cy.get('#registerModal button.btn-close').click({ force: true })
    cy.get('button[data-bs-target="#loginModal"]').eq(0).click({ force: true })
    cy.wait(1000)
    cy.get('#loginEmail').type('anonymous@noroff.no')
    cy.wait(1000)
    cy.get('#loginPassword').type('123456789')
    cy.get('#loginForm').submit()
    cy.wait(2000)
    cy.url().should('include', '/?view=profile')
  }

  const logoutUser = () => {
    cy.get('button[data-auth="logout"]').click()
  }

  beforeEach(() => {
    loginUser()
  })

  it('should login the user and then log the user out', () => {
    cy.wait(4000) // Wait for 4 seconds
    logoutUser()
    cy.window().then((window) => {
      const authToken = window.localStorage.getItem('token')
      expect(authToken).to.be.null
    })
  })
})
