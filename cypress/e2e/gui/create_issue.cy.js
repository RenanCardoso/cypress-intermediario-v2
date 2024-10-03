import { faker } from "@faker-js/faker";
const options = { env: { snapshotOnly: true } };
describe("Criar Issue", () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    },
  };

  beforeEach(() => {
    cy.guiLogin();
    //Precisa ter um projeto para criar uma issue, isso garante testes individuais
    cy.guiCreateProject(issue.project);
  });
  it("criar issue com sucesso", options, () => {
    cy.guiCreateIssue(issue);

    cy.get(".issue-details")
      .should("contain", issue.title)
      .and("contain", issue.description);
  });
});
