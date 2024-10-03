import { faker } from "@faker-js/faker";
import { getCurrentDate, getCurrentDatePlusOneYear } from '../../support/utils/date_utils';
const options = { env: { snapshotOnly: true } };

describe("Criar milestone", () => {
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

    beforeEach(() => {
        cy.apiDeleteProjects();
        cy.apiCreateProject(milestone.project);
        cy.guiLogin();
    });

    it("criar milestone com sucesso", options, () => {
        cy.guiCreateMilestone(milestone)

        cy.get(".milestone-detail > .title").should("contain", milestone.title)
    });
});
