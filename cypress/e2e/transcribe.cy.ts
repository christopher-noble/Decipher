describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('.nav-link-transcribe').click();
    cy.get('.tag-area').type('jamie pull that up');
    cy.get('[name=url-input]').type('https://www.youtube.com/watch?v=SRgct4c5T5U');
    cy.get('button.submit').click();
    cy.get('#controlTextArea1', { timeout: 25000 }).should('be.disabled'); // give 25 seconds for the transcription to complete
  })
})