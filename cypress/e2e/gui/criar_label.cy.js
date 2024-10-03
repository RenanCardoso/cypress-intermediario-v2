import { faker } from "@faker-js/faker";
const options = { env: { snapshotOnly: true } };
describe("Criar label", () => {
  const label = {
    name: `label-${faker.datatype.uuid()}`,
    color: faker.color.rgb(),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    },
  };

  beforeEach(() => {
    cy.guiLogin();
    cy.guiCreateProject(label.project);
  });
  it("criar label com sucesso", options, () => {
    cy.guiCreateLabel(label)

    cy.get(".content-list")
      .should("contain", label.name)
      cy.contains(label.name).should('have.css', label.color)
  });
});
