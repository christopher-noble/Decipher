describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('.tag-area').type('jamie pull that up');
    cy.get('[name=url-input]').type('https://www.youtube.com/watch?v=SRgct4c5T5U');
    cy.get('button.submit').click();
    cy.get('#controlTextarea1', { timeout: 40000 }).should('be.disabled'); // wait 30 seconds for the job to complete
  })
})