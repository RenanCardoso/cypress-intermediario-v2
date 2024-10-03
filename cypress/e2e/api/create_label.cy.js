import { faker } from "@faker-js/faker";

describe("Criar label via API", () => {
  beforeEach(() => cy.apiDeleteProjects());

  it("criar com sucesso", () => {
    const label = {
      name: `label-${faker.datatype.uuid()}`,
      color: faker.color.rgb({ casing: 'upper' }),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
      },
    };

    cy.apiCreateLabel(label).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal(label.name);
      expect(response.body.color).to.equal(label.color);
    });
  });
});
