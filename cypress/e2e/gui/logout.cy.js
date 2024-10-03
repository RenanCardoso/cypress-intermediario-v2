describe("Logout", () => {
  beforeEach(() => {
    cy.guiLogin();
    cy.visit('/');
  });
  it("realizar logout com sucesso", () => {
    cy.guiLogout();

    //Verificar se estou na página de login
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/users/sign_in`);
  });
});
