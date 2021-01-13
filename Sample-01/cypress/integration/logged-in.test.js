const EMAIL = Cypress.env('USER_EMAIL');
const PASSWORD = Cypress.env('USER_PASSWORD');

if (!EMAIL || !PASSWORD) {
  throw new Error('You must provide CYPRESS_USER_EMAIL and CYPRESS_USER_PASSWORD environment variables');
}

const login = () => {
  cy.get('input[name=email], input[name=username]').focus().clear().type(EMAIL);
  cy.get('input[name=password]').focus().clear().type(PASSWORD);
  cy.get('button[name=submit], button[name=action]').click();
};

describe('logged in', () => {
  context('desktop', () => {
    before(() => {
      cy.visit('/');
      cy.get('[data-testid=navbar-login-desktop]').click();
      login();
    });

    after(() => {
      cy.get('[data-testid=navbar-menu-desktop]').click();
      cy.get('[data-testid=navbar-logout-desktop]').click();
    });

    it('should display the navigation bar', () => {
      cy.get('[data-testid=navbar-items]').children().should('have.length', 2);
      cy.get('[data-testid=navbar-menu-desktop]').should('exist');
      cy.get('[data-testid=navbar-menu-desktop]').should('be.visible');
      cy.get('[data-testid=navbar-menu-mobile]').should('exist');
      cy.get('[data-testid=navbar-menu-mobile]').should('not.be.visible');
      cy.get('[data-testid=navbar-picture-desktop]').should('exist');
      cy.get('[data-testid=navbar-picture-desktop]').should('be.visible');
    });

    it('should expand the navigation bar menu', () => {
      cy.get('[data-testid=navbar-user-desktop]').should('exist');
      cy.get('[data-testid=navbar-user-desktop]').should('not.be.visible');
      cy.get('[data-testid=navbar-profile-desktop]').should('exist');
      cy.get('[data-testid=navbar-profile-desktop]').should('not.be.visible');
      cy.get('[data-testid=navbar-logout-desktop]').should('exist');
      cy.get('[data-testid=navbar-logout-desktop]').should('not.be.visible');
      cy.get('[data-testid=navbar-menu-desktop]').click();
      cy.get('[data-testid=navbar-user-desktop]').should('be.visible');
      cy.get('[data-testid=navbar-profile-desktop]').should('be.visible');
      cy.get('[data-testid=navbar-logout-desktop]').should('be.visible');
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

    it('should display the external API page', () => {
      cy.get('[data-testid=navbar-external]').should('exist');
      cy.get('[data-testid=navbar-external]').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/external`);

      cy.get('[data-testid=navbar-home]').isNotActive();
      cy.get('[data-testid=navbar-external]').isActive();
      cy.get('[data-testid=external]').should('exist');
    });

    it('should display the profile page', () => {
      cy.get('[data-testid=navbar-menu-desktop]').click();
      cy.get('[data-testid=navbar-profile-desktop]').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/profile`);

      cy.get('[data-testid=navbar-home]').isNotActive();
      cy.get('[data-testid=navbar-external]').isNotActive();
      cy.get('[data-testid=profile]').should('exist');
      cy.get('[data-testid=profile-email]').contains(EMAIL);
      cy.get('[data-testid=profile-info]').contains(EMAIL);
    });
  });

  context('mobile', () => {
    before(() => {
      cy.mobileViewport();
      cy.get('[data-testid=navbar-toggle]').click();
      cy.get('[data-testid=navbar-login-mobile]').click();
      login();
    });

    after(() => {
      cy.get('[data-testid=navbar-toggle]').click();
      cy.get('[data-testid=navbar-logout-mobile]').click();
    });

    beforeEach(() => cy.mobileViewport());

    it('should expand the navigation bar menu', () => {
      cy.get('[data-testid=navbar-user-mobile]').should('not.be.visible');
      cy.get('[data-testid=navbar-profile-mobile]').should('not.be.visible');
      cy.get('[data-testid=navbar-logout-mobile]').should('not.be.visible');
      cy.get('[data-testid=navbar-toggle]').click();
      cy.get('[data-testid=navbar-user-mobile]').should('be.visible');
      cy.get('[data-testid=navbar-profile-mobile]').should('be.visible');
      cy.get('[data-testid=navbar-logout-mobile]').should('be.visible');
    });
  });
});
