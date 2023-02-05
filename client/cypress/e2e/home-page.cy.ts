describe('Tests home page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');

    const { email, password } = Cypress.env('userOne');
    cy.login(email, password);
    cy.visit(`${Cypress.env('local')}home`);
  });

  it('Visits home page', () => {
    cy.contains("What's on your mind?");
  });
});

export {};
