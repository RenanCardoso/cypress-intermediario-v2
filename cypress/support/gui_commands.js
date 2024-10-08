Cypress.Commands.add(
    "guiLogin",
    (
      user = Cypress.env('user_name'),
      password = Cypress.env('user_password'),
      { cacheSession = true } = {},
    ) => {
      const login = () => {
        cy.visit('/users/sign_in')
    
        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password, { log: false })
        cy.get("[data-qa-selector='sign_in_button']").click()
      }
    
      const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
          .should('not.eq', '/users/sign_in')
      }
    
      const options = {
        cacheAcrossSpecs: true,
        validate,
      }
    
      if (cacheSession) {
        cy.session(user, login, options)
      } else {
        login()
      }
    })
  
  Cypress.Commands.add('guiLogout', () => {
      cy.get('[data-qa-selector="user_menu"]').click();
      cy.contains('Sign out').click()
    })
  
  Cypress.Commands.add("guiCreateProject", (project) => {
    cy.visit("/projects/new");
  
    cy.get("#project_name").type(project.name);
    cy.get("#project_description").type(project.description);
    cy.get(".qa-initialize-with-readme-checkbox").check();
    cy.contains("Create project").click();
  });
  
  Cypress.Commands.add("guiCreateIssue", (issue) => {
    cy.visit(`/${Cypress.env("user_name")}/${issue.project.name}/issues/new`);
  
    cy.get("#issue_title").type(issue.title);
    cy.get("#issue_description").type(issue.description);
    cy.get("#issue_confidential").check();

    cy.contains("Submit issue").click();
  });

  Cypress.Commands.add("guiCreateLabel", (label) => {
    cy.visit(`/${Cypress.env("user_name")}/${label.project.name}/-/labels/new`);
  
    cy.get("#label_title").type(label.name);
    cy.get("#label_description").type(label.description);
    cy.get("#label_color").clear().type(label.color);

    cy.contains("Create label").click();
  });
  
  Cypress.Commands.add("guiCreateMilestone", (milestone) => {
    cy.visit(`/${Cypress.env("user_name")}/${milestone.project.name}/-/milestones/new`);
  
    cy.get("#milestone_title").type(milestone.title);
    cy.get(".qa-milestone-description").type(milestone.description);
    cy.get("#milestone_start_date").type(milestone.start_date).blur();
    cy.get("#milestone_due_date").type(milestone.due_date).blur();

    cy.contains("Create milestone").click();
  });
  