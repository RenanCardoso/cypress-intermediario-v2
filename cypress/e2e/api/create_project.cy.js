import { faker } from "@faker-js/faker";

describe("Criar Projeto via API", () => {
  beforeEach(() => cy.apiDeleteProjects());

  it("criar com sucesso", () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    };

    cy.apiCreateProject(project).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal(project.name);
      expect(response.body.description).to.equal(project.description);
    });
  });
});
