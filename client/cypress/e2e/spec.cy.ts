describe('Tests auth page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('local'));
  });

  it('Visits auth page', () => {
    cy.contains('Log In');
    cy.contains('Create new account');
  });

  it('logs in', () => {
    cy.login('test', 'test');
  });

  describe('Tests Create account page', () => {
    it('Visits Create account page', () => {
      cy.findByRole('button', { name: 'Create new account' }).click();
      cy.contains('Sign Up');
      cy.findByRole('button', { name: '' }).click(); // should be fixed
      cy.contains('Log In');
    });
  });
});
