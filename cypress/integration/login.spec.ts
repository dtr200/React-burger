/// <reference types="cypress" />

describe('should login successfylly', () => {
    it('should login and get to the main page', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[name="email"]')
          .type('jaxer@list.ru')
        cy.get('[name="password"]')
          .type('12')
        cy.get('button')
          .click()  
        cy.contains('Соберите бургер')
    })
})