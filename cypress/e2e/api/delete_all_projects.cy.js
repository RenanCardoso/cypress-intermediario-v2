describe("Deletar todos projetos via API", () => {
  it("deletar com sucesso", () => {
    cy.apiGetAllProjects().then((response) => {
      expect(response.status).to.equal(200);
      if (response.body.length > 0) {
        cy.apiDeleteProjects().then((response) => {
          expect(response.status).to.equal(202);
        });
      }
    });
  });
});
