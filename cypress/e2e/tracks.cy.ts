/// <reference types="cypress" />
describe('Track List Functionality', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/graphql');
    cy.wait(1000);
  });

  it('should display the track list page', () => {
    cy.contains('h2', 'search the tracklist (GRAPHQL)');
    cy.get('table').should('not.exist');
  });

  it('should filter tracks by name', () => {
    const searchTerm = 'evil';
    cy.get('input[placeholder*="type track\'s name to search"]').type(
      searchTerm,
    );

    cy.wait(2000);

    cy.get('tbody tr').each(($row) => {
      cy.wrap($row)
        .find('td')
        .first()
        // .should('contain.text', searchTerm, { matchCase: false });
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include(searchTerm.toLowerCase());
        });
    });
    cy.get('tbody tr').should('have.length.lessThan', 30);

    cy.get('input[placeholder*="type track\'s name to search"]').clear();
    cy.wait(2000);
    cy.get('tbody tr').should('have.length.greaterThan', 3000);
  });
});
