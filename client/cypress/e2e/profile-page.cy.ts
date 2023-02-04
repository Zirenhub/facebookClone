describe('Tests profile page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');

    const { email, password } = Cypress.env('userOne');
    cy.login(email, password);
  });
  it('Visits own profile', () => {
    cy.visit(`${Cypress.env('local')}home`);
    cy.get(':nth-child(4) > svg').click();
    cy.contains('Test User2');
  });
});
