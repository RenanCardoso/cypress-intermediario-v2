const accessToken = `Bearer ${Cypress.env("gitlab_access_token")}`;

Cypress.Commands.add("apiCreateProject", (project) => {
  cy.request({
    method: "POST",
    url: `/api/v4/projects/`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true,
    },
    headers: { Authorization: accessToken },
  });
});

Cypress.Commands.add("apiGetAllProjects", () => {
  cy.request({
    method: "GET",
    url: `/api/v4/projects/`,
    headers: { Authorization: accessToken },
  });
});

Cypress.Commands.add("apiDeleteProjects", () => {
  cy.apiGetAllProjects().then((res) => {
    if (res.body.length > 0) {
      res.body.forEach((project) => {
        cy.request({
          method: "DELETE",
          url: `/api/v4/projects/${project.id}`,
          headers: { Authorization: accessToken },
        });
      });
    } else {
      console.log("A resposta não está vazia.");
    }
  });
});

Cypress.Commands.add('apiCreateIssue', issue => {
  cy.apiCreateProject(issue.project)
    .then(response => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/issues`,
        body: {
          title: issue.title,
          description: issue.description
        },
        headers: { Authorization: accessToken },
      })
  })
})

Cypress.Commands.add('apiCreateLabel', label => {
  cy.apiCreateProject(label.project)
    .then(response => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/labels`,
        body: {
          name: label.name,
          description: label.description,
          color: label.color
        },
        headers: { Authorization: accessToken },
      })
  })
})

Cypress.Commands.add('apiCreateMilestone', milestone => {
  cy.apiCreateProject(milestone.project)
    .then(response => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/milestones`,
        body: {
          title: milestone.title,
          description: milestone.description,
          start_date: milestone.start_date,
          due_date: milestone.due_date,
        },
        headers: { Authorization: accessToken },
      })
  })
})