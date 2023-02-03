describe('Tests friends page', () => {
  before(() => {
    const { email, password } = Cypress.env('user');
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.viewport('iphone-6');
  });
});
