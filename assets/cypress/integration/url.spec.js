describe('URL', () => {
  beforeEach(() => {
    cy.exec('npm run reset');
  });

  it('creates a new url and redirects on navigation to it', () => {
    cy.visit('/');
    cy.get('input').type('http://localhost:4000/');

    cy.get('button').click();

    cy.get('[data-test-short-url]').should('be.visible');
    cy.get('[data-test-short-url]').then(($span) => {
      cy.visit($span.text());
      cy.location('pathname').should('eq', '/');
    });
  });
});
