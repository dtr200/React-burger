/// <reference types="cypress" />

describe('should login successfylly', () => {
    before(() => {
        cy.visit('http://localhost:3000/login')
        cy.get('[name="email"]')
          .type('jaxer@list.ru')
        cy.get('[name="password"]')
          .type('12')
        cy.get('button')
          .click()  
        cy.contains('Соберите бургер')
    })

    it('should open the modal', () => {
        cy.get('[alt="Соус фирменный Space Sauce"]')
          .click()
        cy.get('p')
          .contains('Соус фирменный Space Sauce')
        cy.get('span')
          .contains('Белки, г')
    })

    it('should close the modal', () => {
        cy.get('h3')
          .parent()
          .parent()
          .find('div')
          .first()
          .click()
    })

    it('should drag & drop an ingredients', () => {
        cy.get('[alt="Флюоресцентная булка R2-D3"]')
          .trigger('dragstart')
        cy.get('main section')
          .last()  
          .trigger('drop')
        cy.get('[alt="Филе Люминесцентного тетраодонтимформа"]')
          .trigger('dragstart')
        cy.get('main section')
          .last()
          .find('ul')
          .eq(1) 
          .trigger('drop')
        cy.get('[alt="Биокотлета из марсианской Магнолии"]')
          .trigger('dragstart')
        cy.get('main section')
          .last()
          .find('ul')
          .eq(1) 
          .trigger('drop')
        cy.get('[alt="Соус традиционный галактический"]')
          .trigger('dragstart')
        cy.get('main section')
          .last()
          .find('ul')
          .eq(1) 
          .trigger('drop')
    });

    it('should drag & drop works in constructor side', () => {
        cy.get('main section')
          .last()
          .find('[alt="Соус традиционный галактический"]')
          .trigger('dragstart')
        cy.get('[alt="Филе Люминесцентного тетраодонтимформа"]')
          .eq(1)
          .trigger('drop')
    })
    it('should delete one ingredient', () => {
        cy.get('main section')
          .last()
          .find('ul')
          .eq(1)
          .find('svg')
          .eq(2)
          .click()
    })
    it('should checkout successfylly', () => {
        
    })
})