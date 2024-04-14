Cypress.Commands.addAll({
  loginUser: (email, password) => {
    cy.wait(1000)
    cy.get('#loginEmail').type(email)
    cy.wait(1000)
    cy.get('#loginPassword').type(password)
    cy.get('#loginForm').submit()
    cy.wait(2000)
  },
  openLoginForm: () => {
    cy.get('#registerForm')
      .should('be.visible')
      .parent()
      .find('[data-auth="login"]')
      .click()
    cy.wait(500)
  },
  logoutUser: () => {
    cy.get('button[data-auth="logout"]').click()
  },
})
