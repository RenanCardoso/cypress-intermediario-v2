import { faker } from "@faker-js/faker";

describe("Criar milestone via API", () => {
  beforeEach(() => cy.apiDeleteProjects());

  it("criar com sucesso", () => {
    const milestone = {
      name: `milestone-${faker.datatype.uuid()}`,
      color: faker.color.rgb(),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
      },
    };

    cy.apiCreateMilestone(milestone).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal(milestone.name);
      expect(response.body.color).to.equal(milestone.color);
    });
  });
});
