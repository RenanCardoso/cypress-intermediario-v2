import { faker } from "@faker-js/faker";
import { hexToRgb } from '../../support/utils/hex_to_rgb';
const options = { env: { snapshotOnly: true } };
describe("Criar label", () => {
  const label = {
    name: `label-${faker.datatype.uuid()}`,
    color: faker.color.rgb({ casing: 'upper' }),
    description: faker.random.words(5),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    },
  };

  beforeEach(() => {
    cy.apiDeleteProjects();
    cy.apiCreateProject(label.project);
    cy.guiLogin();
  });

  it("criar label com sucesso", options, () => {
    cy.guiCreateLabel(label)

    cy.get(".content-list")
      .should("contain", label.name)
    cy.get(".label-name > .color-label").should('have.css', 'background-color', hexToRgb(label.color));
  });
});
