/// <reference types="cypress" />
describe('App Navigation', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should navigate to GraphQL tracks page from header link', () => {
    cy.visit('/');
    cy.get('nav a[routerLink="/graphql"]').click();
    cy.url().should('include', '/graphql');
    cy.contains('h2', 'search the tracklist (GRAPHQL)');
  });

  it('should navigate to REST tracks page from header link', () => {
    cy.visit('/');
    cy.get('nav a[routerLink="/tracks"]').click();
    cy.url().should('include', '/tracks');
    cy.get('input[placeholder*="Search by track name"]').should('exist');
  });
});
