const navbarActiveClass = 'router-link-exact-active';

Cypress.Commands.add(
  'isActive',
  {
    prevSubject: true
  },
  selector => {
    cy.get(selector).should('have.class', navbarActiveClass);
  }
);

Cypress.Commands.add(
  'isNotActive',
  {
    prevSubject: true
  },
  selector => {
    cy.get(selector).should('not.have.class', navbarActiveClass);
  }
);

Cypress.Commands.add('mobileViewport', () => cy.viewport(500, 1000));
