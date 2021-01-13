describe('logged out', () => {
  before(() => cy.visit('/'));

  context('desktop', () => {
    it('should display the navigation bar', () => {
      cy.get('[data-testid=navbar]').should('exist');
      cy.get('[data-testid=navbar-items]').should('exist');
      cy.get('[data-testid=navbar-items]').should('be.visible');
      cy.get('[data-testid=navbar-items]').children().should('have.length', 1);
      cy.get('[data-testid=navbar-login-desktop]').should('exist');
      cy.get('[data-testid=navbar-login-desktop]').should('be.visible');
      cy.get('[data-testid=navbar-login-mobile]').should('exist');
      cy.get('[data-testid=navbar-login-mobile]').should('not.be.visible');
      cy.get('[data-testid=navbar-toggle]').should('exist');
      cy.get('[data-testid=navbar-toggle]').should('not.be.visible');
      cy.get('[data-testid=navbar-menu-desktop]').should('not.exist');
      cy.get('[data-testid=navbar-menu-mobile]').should('not.exist');
    });

    it('should display the home page', () => {
      cy.get('[data-testid=navbar-home]').should('exist');
      cy.get('[data-testid=navbar-home]').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);

      cy.get('[data-testid=navbar-home]').isActive();
      cy.get('[data-testid=hero]').should('exist');
      cy.get('[data-testid=content]').should('exist');
      cy.get('[data-testid=footer]').should('exist');
    });
  });

  context('mobile', () => {
    beforeEach(() => cy.mobileViewport());

    it('should expand the navigation bar menu', () => {
      cy.get('[data-testid=navbar-items]').should('not.be.visible');
      cy.get('[data-testid=navbar-login-mobile]').should('not.be.visible');
      cy.get('[data-testid=navbar-login-desktop]').should('not.be.visible');
      cy.get('[data-testid=navbar-toggle]').should('be.visible');
      cy.get('[data-testid=navbar-toggle]').click();
      cy.get('[data-testid=navbar-items]').should('be.visible');
      cy.get('[data-testid=navbar-login-mobile]').should('be.visible');
      cy.get('[data-testid=navbar-login-desktop]').should('not.be.visible');
    });
  });
});
