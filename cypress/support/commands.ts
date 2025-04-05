/// <reference types="cypress" />
export {};
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;

      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(username?: string, password?: string): Chainable<void>;
//     }
//   }
// }

Cypress.Commands.add(
  'login',
  (username = 'testuser', password = 'testpassword') => {
    cy.log('Logging in programmatically');
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/token',
      form: true,
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('access_token');

      cy.window()
        .its('localStorage')
        .invoke('setItem', 'access_token', response.body.access_token);

      cy.window().then((win) => {
        win.localStorage.setItem('access_token', response.body.access_token);
      });
    });
  },
);
