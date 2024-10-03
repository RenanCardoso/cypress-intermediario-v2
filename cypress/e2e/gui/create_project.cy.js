import { faker } from '@faker-js/faker'
const options = { env: { snapshotOnly: true } }
describe("Criar Projeto", () => {
  beforeEach(() => {
    cy.guiLogin();
  });
  it("criar projeto com sucesso", options, () => {
    const project = {
      name:        `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    };

    cy.guiCreateProject(project)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
  });
});
