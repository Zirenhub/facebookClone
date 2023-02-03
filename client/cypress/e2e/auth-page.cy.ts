describe('Tests auth page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit(Cypress.env('local'));
  });

  it('Visits auth page', () => {
    cy.contains('Log In');
    cy.contains('Create new account');
  });

  it('Visits Create account page', () => {
    cy.findByRole('button', { name: 'Create new account' }).click();
    cy.contains('Sign Up');
    cy.findByRole('button', { name: '' }).click(); // should be fixed
    cy.contains('Log In');
  });

  it('logs in', () => {
    const { email, password } = Cypress.env('user');
    cy.login(email, password);
  });
});
