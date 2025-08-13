describe('Central de atendimento ao Cliente TAT', () => {
    beforeEach( () => {
        cy.visit('./src/index.html');
    });

    it('verifica o titulo da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });

    Cypress._.times( 5 , () => {
        it('preenche os campos obrigatórios e envia o formulário', () => {
            cy.clock();

            cy.fillMandatoryFieldsAndSubmit(null, 0);
            cy.contains('button', 'Enviar').click();

            cy.get('.success').should('be.visible');
            cy.tick(3000);
            cy.get('.success').should('not.be.visible');
        })
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock();

        cy.get('#firstName').type('Lucas');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('lucasSilva');
        cy.get('#open-text-area').type('Muito obrigado por me ajudar! Poderiamos rever tambem o atendimento ao cliente antes, durante e após o atendimento ao cliente.');
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    });

    it('preenche o campo telefone com letras e espera que o campo esteja vazio', () => {
        cy.get('#phone').as('inputNumber').type('nao pode aparecer');

        cy.get('@inputNumber').should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock();

        cy.get('#firstName').type('Alves');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('alvesSilva@email.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Muito obrigado por me ajudar! Poderiamos rever tambem o atendimento ao cliente antes, durante e após o atendimento ao cliente.');
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Alves')
            .should('have.value', 'Alves')
            .clear()
            .should('have.value', '');

        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '');

        cy.get('#email')
            .type('alvesSilva@email.com')
            .should('have.value', 'alvesSilva@email.com')
            .clear()
            .should('have.value', '');

        cy.get('#phone')
            .type('912345678')
            .should('have.value', '912345678')
            .clear()
            .should('have.value', '');
        
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock();

        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    });

    it('envia o formulário com sucesso usando um comando customizado', () => {
        const dataUser = {
            firstName: 'Latino',
            lastName: 'Ratinho',
            email: 'latinoRatinho@email.com',
            helpMessageAndFeedback: 'Testando user Objects'
        };

        cy.clock();

        cy.fillMandatoryFieldsAndSubmit(dataUser);
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');
        cy.tick(3000);
        cy.get('.success').should('not.be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked');
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').each( $radio => {
            cy.wrap($radio)
            .check()
            .should('be.checked');
        });
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type=checkbox]')
            .as('checkbox')
            .each( $checkbox => {
                cy.wrap($checkbox)
                    .check()
                    .should('be.checked');
            });

        cy.get('@checkbox')
            .last()
            .uncheck()
            .should('not.be.checked');
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[id="file-upload"]')
            .selectFile('./cypress/fixtures/example.json')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[id="file-upload"]')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(input => {
                expect(input[0].files[0].name).to.be.equal('example.json');
            });
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('arquivoJSONDeExemplo');

        cy.get('input[id="file-upload"]')
            .selectFile('@arquivoJSONDeExemplo')
            .should(input => {
                expect(input[0].files[0].name).to.be.equal('example.json');
            });
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.contains('a', 'Política de Privacidade')
            // .click()
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href', 'privacy.html');
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.contains('a', 'Política de Privacidade')
            .invoke('removeAttr', 'target')
            .click();

        cy.url()
            .should('contain', '/src/privacy.html');
    })
    
    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')

        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche o campo da área de texto usando o comando invoke', () => {
        cy.get('#open-text-area')
            .as('textArea')
            .invoke('val', 'Olá, Mundo!')
        
        cy.get('@textArea').should('have.value', 'Olá, Mundo!')
    })

    it('faz uma requisição HTTP', () => {
        // 1ª Forma - Feito sozinho
        // cy.request({
        //     method: 'GET',
        //     url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
        // }).then( res => {
        //     cy.wrap(res)
        //         .as('resposta')
        //         .its('status')
        //         .should('be.equal' , 200)

        //     cy.get('@resposta')
        //         .its('statusText')
        //         .should('be.equal', 'OK')
            
        //     cy.get('@resposta')
        //         .its('body')
        //         .should('contain', 'CAC TAT')
        // })



        // 2ª Forma - Explicado pelo ChatGPT, forma com o uso de encadeamento com o get do alias
        // cy.request({
        //     method: 'GET',
        //     url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
        // }).as('resposta')

        // cy.get('@resposta')
        //     .its('status')
        //     .should('be.equal' , 200)

        // cy.get('@resposta')
        //     .its('statusText')
        //     .should('be.equal', 'OK')

        // cy.get('@resposta')
        //     .its('body')
        //     .should('contain' , 'CAC TAT')



        // 3ª Forma - Explicado pelo CHatGPT, uma forma mais direta e rápida
        cy.request({
            method: 'GET',
            url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
        }).then( resposta => {
            expect(resposta.status).to.be.equal(200)
            expect(resposta.statusText).to.be.equal('OK')
            expect(resposta.body).contain('CAC TAT')
        })
    })

    it('Desafio de mostrar o gato que está escondido no HTML', () => {
        cy.get('#cat')
            .invoke('show')
            .invoke('css', 'font-size', '50px')
            .should('be.visible')
            .invoke('hide')
            .should('not.be.visible')
    })
});