describe("Listar todos projetos via API", () => {
  it("listar com sucesso", () => {
    cy.apiGetAllProjects().then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
