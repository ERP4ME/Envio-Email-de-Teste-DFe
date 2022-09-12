/// <reference types="cypress"/> 

// Projeto para a tarefa ( KOOPON-18830- para ser rodado na revisão dos processos em HML.)
describe('Envio de Email teste', () => {
    beforeEach(() => {
        cy.login()

        cy.intercept('GET', '/koopon-core-rest-api/empresa/configuracoes',
            { fixture: 'email-alterdata' }).as('dadosEmail')

    });

    it('Quando realizar o Envio de Email de teste pelo DF-e, então o Envio de funcionar corretamente. ',() => {
        cy.intercept('POST', '/koopon-core-rest-api/empresa/configuracoes/envio-email').as("EnvioEmail")
        cy.acessarConfiguracoes()
        cy.wait('@dadosEmail')
        cy.acessarAbaEmail()
        cy.get('[ng-model$="emailDestinatario"]')
            .last()
            .type('welington.dsn.shop@alterdata.com.br')
        cy.contains('Enviar e-mail de teste').click()
        cy.wait("@EnvioEmail").its("response.statusCode").should("be.equal", 200);
        cy.get('#koopon-comum-alerta-generico').should('be.visible')
        cy.contains('O e-mail de teste foi enviado com sucesso.')
            .should('have.text', 'O e-mail de teste foi enviado com sucesso.')

    })

});