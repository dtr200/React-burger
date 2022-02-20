/// <reference types="cypress" />

describe('should order works successfylly', () => {
    before(() => {
        cy.visit('http://localhost:3000')
        cy.contains('Соберите бургер')
    })

    it('should open the modal', () => {
        cy.get('[alt="Соус фирменный Space Sauce"]')
          .click()
        cy.get('[data-cy="ingredient-modal-name"]')
          .contains('Соус фирменный Space Sauce')
        cy.get('[data-cy="ingredient-modal-item"]')
          .contains('Белки, г')
    })

    it('should close the modal', () => {
        cy.get('[data-cy="close-modal"]')
          .click()
        cy.get('[data-cy="close-modal"]')
          .should('not.exist')
    })

    it('should drag & drop an ingredients', () => {
        cy.get('[alt="Флюоресцентная булка R2-D3"]')
          .trigger('dragstart')
        cy.get('[data-cy="constructor"]')  
          .trigger('drop')
        cy.get('[alt="Филе Люминесцентного тетраодонтимформа"]')
          .trigger('dragstart')
        cy.get('[data-cy="constructor-main"]')          
          .trigger('drop')
        cy.get('[alt="Биокотлета из марсианской Магнолии"]')
          .trigger('dragstart')
        cy.get('[data-cy="constructor-main"]')   
          .trigger('drop')
        cy.get('[alt="Соус традиционный галактический"]')
          .trigger('dragstart')
        cy.get('[data-cy="constructor-main"]')
          .trigger('drop')
    });

    it('should delete one ingredient', () => {
        cy.get('[data-cy="constructor-item"]')
          .eq(1)
          .find('svg')
          .eq(2)
          .click()
        cy.get('[alt="Филе Люминесцентного тетраодонтимформа"]')
          .should('have.length', 1)
    })
    it('should order checkout successfylly', () => {
        cy.get('[data-cy="order-button"]')
          .click()
        cy.get('[name="email"]')
          .type('jaxer@list.ru')
        cy.get('[name="password"]')
          .type('12')
        cy.get('[data-cy="login-button"]')
          .click()
        cy.get('[data-cy="order-button"]')
          .click()
        cy.get('[data-cy="order-details-title"]', { timeout: 17000 })
          .contains('идентификатор заказа')
    })
    it('should close the order modal successfylly', () => {
        cy.get('[data-cy="close-modal"]')
          .click()
        cy.get('[data-cy="close-modal"]')
          .should('not.exist')
    })
})