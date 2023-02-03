describe('Tests profile page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');

    const { email, password } = Cypress.env('user');
    cy.login(email, password);
  });
  it('Visits own profile', () => {
    cy.visit(`${Cypress.env('local')}home`);
  });
});
