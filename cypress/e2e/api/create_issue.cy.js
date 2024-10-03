import { faker } from "@faker-js/faker";

describe("Criar issue via API", () => {
  beforeEach(() => cy.apiDeleteProjects());

  it("criar com sucesso", () => {
    const issue = {
      title: `issue-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
      },
    };

    cy.apiCreateIssue(issue).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.title).to.equal(issue.title);
      expect(response.body.description).to.equal(issue.description);
    });
  });
});
