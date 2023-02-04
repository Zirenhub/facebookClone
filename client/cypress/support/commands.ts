/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (email, password) => {
  cy.session(email, () => {
    cy.visit(Cypress.env('local'));
    cy.get(':nth-child(1) > .border-2').type(email);
    cy.get(':nth-child(2) > .border-2').type(`${password}{enter}`, {
      log: false,
    });
    cy.url().should('include', '/home');
    cy.contains("What's on your mind?");
  });
});

Cypress.Commands.add('sendRequest', () => {
  const { testEmail, testPassword } = Cypress.env('testuser2');
  const { erdinchEmail, erdinchPassword } = Cypress.env('erdinch');

  cy.login(testEmail, testPassword);

  cy.visit(`${Cypress.env('local')}home`);
  cy.get('button.bg-gray-200 > svg').click();

  cy.findByPlaceholderText('Search').type('Erdinch');
  cy.contains('erdinch osman').click();
  cy.contains('Erdinch Osman');
  cy.get('main > :nth-child(1) > .gap-2').then(($div) => {
    const requestBtn = $div.children()[0];
    if (requestBtn.textContent === 'Add Friend') {
      requestBtn.click();
    } else if (requestBtn.textContent === 'Unfriend') {
      requestBtn.click();
      cy.contains('Add Friend').click();
    }
    cy.contains('Cancel Request');
    cy.login(erdinchEmail, erdinchPassword);
    cy.visit(`${Cypress.env('local')}friends`);
    cy.contains('Test User2').click();
    cy.contains('Accept Friend Request');
  });
});

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
