Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ( dataUserTreatment, delay = 10) => {
    if (dataUserTreatment){
        cy.get('#firstName').type(dataUserTreatment.firstName);
        cy.get('#lastName').type(dataUserTreatment.lastName);
        cy.get('#email').type(dataUserTreatment.email);
        cy.get('#open-text-area').type(dataUserTreatment.helpMessageAndFeedback, {delay: delay});
        cy.contains('button', 'Enviar').click();
    } else {
        cy.get('#firstName').type('Lucas');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('lucasSilva@email.com');
        cy.get('#open-text-area').type('Muito obrigado por me ajudar! Poderiamos rever tambem o atendimento ao cliente antes, durante e após o atendimento ao cliente.', {delay: delay});
        cy.contains('button', 'Enviar').click();
    }
});