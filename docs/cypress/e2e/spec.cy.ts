describe('Authenticator:', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  describe('Homepage', () => {
    it('has heading', () => {
      cy.get('h1').contains('Themeable, accessible components');
    });
  });
});

export {};
