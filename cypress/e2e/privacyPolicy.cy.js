    it.only('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html');

        cy.get('#title')
            .should('be.visible')
            .and('have.text', 'CAC TAT - Política de Privacidade');

        cy.contains('p', 'Talking About Testing')
            .should('be.visible')
            .and('contain', 'Talking About Testing');
    })