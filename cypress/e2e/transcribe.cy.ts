describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('.tag-area').type('jamie pull that up');
    cy.get('.url-input').type('https://www.youtube.com/watch?v=SRgct4c5T5U');

    cy.get('button.submit').click();
  })
})