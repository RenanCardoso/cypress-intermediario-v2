describe('Login', () => {
  it('realizar login com sucesso', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.guiLogin(user, password, options)
    cy.get('.header-user-dropdown-toggle').should('be.visible')
  })
})