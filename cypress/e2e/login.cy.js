describe('User login functionality', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000)
  })

  const openLoginForm = () => {
    cy.get('#registerModal button.btn-close').click({ force: true })
    cy.get('button[data-bs-target="#loginModal"]').eq(0).click({ force: true })
  }

  it('should switch to the login form when login button is clicked', () => {
    openLoginForm()
    cy.get('#loginForm').should('be.visible')
  })

  const loginUser = (email, password) => {
    openLoginForm()
    cy.wait(1000)
    cy.get('#loginEmail').type(email)
    cy.wait(1000)
    cy.get('#loginPassword').type(password)
    cy.get('#loginForm').submit()
    cy.wait(2000)
  }

  it('should login user with correct credentials', () => {
    loginUser('anonymous@noroff.no', '123456789')
    cy.url().should('include', '/?view=profile')
  })

  it('should alert an error when user logs in with invalid credentials', () => {
    loginUser('wrongaccount@noroff.no', '123456789')
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain(
        'Either your username was not found or your password is incorrect',
      )
    })
  })
})
