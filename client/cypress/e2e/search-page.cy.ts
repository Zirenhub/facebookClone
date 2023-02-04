describe('Tests search page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');

    const { email, password } = Cypress.env('userOne');
    cy.login(email, password);
    cy.visit(`${Cypress.env('local')}home`);
    cy.get('button.bg-gray-200 > svg').click();
  });

  it('Searches for a profile', () => {
    cy.findByPlaceholderText('Search').type('Erdinch');
    cy.contains('erdinch osman');
  });

  it('Visits a profile', () => {
    cy.findByPlaceholderText('Search').type('Erdi');
    cy.contains('erdinch osman').click();
    cy.contains('Erdinch Osman');
    cy.contains('Add Friend');
  });
});
