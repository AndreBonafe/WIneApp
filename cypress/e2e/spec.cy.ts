describe('E2E tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Has an header with the right options and navigate to "/loja"', () => {
    cy.contains('Clube').should('exist');
    cy.contains('Loja').should('exist');
    cy.contains('Produtores').should('exist');
    cy.contains('Ofertas').should('exist');
    cy.contains('Eventos').should('exist');

    cy.contains('Loja').click();
    cy.url().should('include', '/loja');
  })

  it('Has to have all the wines and filters', () => {
    cy.contains('Loja').should('exist');
    cy.contains('Loja').click();
    cy.contains('carregando...').should('exist');
    cy.contains('62').should('exist');
    cy.contains('R$100 A R$200').should('exist');
    cy.contains('R$100 A R$200').click();
    cy.contains('32').should('exist');

    cy.get('[data-cy="remove-filters-btn"]').should('exist');
    cy.get('[data-cy="remove-filters-btn"]').click();
    cy.get('[data-cy="search-icon"]').should('exist');
    cy.get('[data-cy="search-icon"]').click();
    cy.get('[data-cy="search-input"]').should('exist');
    cy.get('[data-cy="search-input"]').type('viña');
    cy.contains('2').should('exist');
    cy.get('[data-cy="card-2"]').should('exist');
  })

  it('Has to Navigate to the details page and show the right information', () => {
    cy.contains('Loja').click();
    cy.get('[data-cy="card-2"]').click();

    cy.url().should('include', '/loja/detalhes/2');
    cy.contains('Chile').should('exist');
    cy.contains('Seco').should('exist');
    cy.contains('Comentário do Sommelier').should('exist');
    cy.contains('ADICIONAR').should('exist');
  })

  it('Has add the right items to the cart', () => {
    cy.contains('Loja').click();
    cy.get('[data-cy="cart-total-itens"]').should('have.text', '0');
    cy.get('[data-cy="card-0"]').should('exist');
    cy.get('[data-cy="add-btn-0"]').should('exist');
    for(let n = 0; n < 5; n += 1){
      cy.get('[data-cy="add-btn-0"]').click();
    }
    cy.get('[data-cy="cart-total-itens"]').should('have.text', '5');

    cy.get('[data-cy="card-0"]').click();
    cy.url().should('include', '/loja/detalhes/0');
    cy.get('[data-cy="detail-qnty"]').should('have.text', '5');
    cy.get('[data-cy="detail-minus-btn"]').should('exist');
    cy.get('[data-cy="detail-plus-btn"]').should('exist');
    cy.get('[data-cy="detail-plus-btn"]').click();

    cy.get('[data-cy="cart-total-itens"]').should('have.text', '6');
    cy.get('[data-cy="detail-qnty"]').should('have.text', '6');

    for(let n = 0; n < 6; n += 1){
      cy.get('[data-cy="detail-minus-btn"]').click();
    }

    cy.get('[data-cy="cart-total-itens"]').should('have.text', '0');
    cy.get('[data-cy="detail-qnty"]').should('have.text', '0');

    cy.contains('ADICIONAR').click();
    cy.url().should('include', '/loja');
  })
})