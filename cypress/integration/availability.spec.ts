/// <reference types="cypress" />

describe('service is available', () => {
    it('should be available on localhost:3000', function() {
      cy.visit('http://localhost:3000');
    });
}); 