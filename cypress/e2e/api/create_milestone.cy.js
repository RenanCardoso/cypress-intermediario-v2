import { faker } from "@faker-js/faker";
import { getCurrentDate, getCurrentDatePlusOneYear } from '../../support/utils/date_utils';

describe("Criar milestone via API", () => {
  beforeEach(() => cy.apiDeleteProjects());

  it("criar com sucesso", () => {

    const milestone = {
      title: `milestone-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
      start_date: getCurrentDate(),
      due_date: getCurrentDatePlusOneYear(),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
      },
    };

    cy.apiCreateMilestone(milestone).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.title).to.equal(milestone.title);
      expect(response.body.description).to.equal(milestone.description);
    });
  });
});
