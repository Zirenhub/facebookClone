describe('Tests friends functionality', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.sendRequest();
  });

  const { testEmail, testPassword } = Cypress.env('testuser2');
  const { erdinchEmail, erdinchPassword } = Cypress.env('erdinch');

  it('Declines request', () => {
    cy.login(erdinchEmail, erdinchPassword);
    cy.visit(`${Cypress.env('local')}friends`);

    cy.contains('Test User2').then(($div: any) => {
      if ($div) {
        const [accept, decline] = $div[0].nextSibling.children;
        decline.click();
        cy.get($div).should('not.exist');
        cy.get('button.bg-gray-200 > svg').click();
        cy.findByPlaceholderText('Search').type('Test User2');
        cy.contains(/Test User2/i).click();
        cy.contains('Test User2');
        cy.contains('Add Friend');

        cy.login(testEmail, testPassword);
        cy.visit(`${Cypress.env('local')}home`);
        cy.get('button.bg-gray-200 > svg').click();
        cy.findByPlaceholderText('Search').type('Erdinch');
        cy.contains('erdinch osman').click();
        cy.contains('Erdinch Osman');
        cy.contains('Add Friend');
      }
    });
  });

  it('Accepts request', () => {
    cy.login(erdinchEmail, erdinchPassword);
    cy.visit(`${Cypress.env('local')}friends`);

    cy.contains('Test User2').then(($div: any) => {
      if ($div) {
        const [accept, decline] = $div[0].nextSibling.children;
        accept.click();
        cy.get($div).should('not.exist');
        cy.get('button.bg-gray-200 > svg').click();
        cy.findByPlaceholderText('Search').type('Test User2');
        cy.contains(/Test User2/i).click();
        cy.contains('Test User2');
        cy.contains('Unfriend');
        cy.visit(`${Cypress.env('local')}friends`);
        cy.contains('Your Friends').click();
        cy.contains('Test User2');

        cy.login(testEmail, testPassword);
        cy.visit(`${Cypress.env('local')}home`);
        cy.get('button.bg-gray-200 > svg').click();
        cy.findByPlaceholderText('Search').type('Erdinch');
        cy.contains('erdinch osman').click();
        cy.contains('Erdinch Osman');
        cy.contains('Unfriend');
      }
    });
  });

  it('Unfriends user', () => {
    cy.login(erdinchEmail, erdinchPassword);
    cy.visit(`${Cypress.env('local')}home`);
    cy.get('button.bg-gray-200 > svg').click();
    cy.findByPlaceholderText('Search').type('Test User2');
    cy.contains(/Test User2/i).click();
    cy.contains('Test User2');
    cy.contains('Accept Friend Request').click();
    cy.contains('Unfriend').click();
    cy.contains('Add Friend');

    cy.login(testEmail, testPassword);
    cy.visit(`${Cypress.env('local')}home`);
    cy.get('button.bg-gray-200 > svg').click();
    cy.findByPlaceholderText('Search').type('Erdinch');
    cy.contains('erdinch osman').click();
    cy.contains('Erdinch Osman');
    cy.contains('Add Friend');
  });
});
