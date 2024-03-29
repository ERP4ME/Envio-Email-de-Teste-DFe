
Cypress.Commands.add('login', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.session([username, password], () => {
    onBeforeLoad: window.localStorage.setItem('ULTIMA_EXIBICAO_NOVIDADES', '14/10/2022')
    onBeforeLoad: window.localStorage.setItem('ARRAY_CRMS_NAO_EXIBIR_NOVIDADES', '["401241"]')
    cy.request({
      method: 'POST',
      url: '/passaporte-rest-api/rest/login',
      body: {
        senha: (Cypress.env('USER_PASSWORD')),
        usuario: (Cypress.env('USER_EMAIL'))

      },
    }).then((response) => {
      console.log(response)
      expect(response.status).to.eq(200)
      console.log(response.headers["set-cookie"][0])
      window.localStorage.setItem('conpass.token', response.headers["set-cookie"][0])
      cy.AcessarSistema()
    })
  })
})



Cypress.Commands.add('AcessarSistema', () => {
  cy.visit('/')
  onBeforeLoad: window.localStorage.setItem('ULTIMA_EXIBICAO_NOVIDADES', '14/10/2022')
  cy.get(":nth-child(3) > .alt-lista-item-container")
    .should('be.visible')
    .click()
  cy.intercept('GET', '/koopon-core-rest-api/empresa/configuracoes/emissao/nota').as("AguardarPagina")
  cy.wait("@AguardarPagina").its("response.statusCode").should("be.equal", 200);
  cy.get('.alt-titulo-view-container li b')
    .should('be.visible')

})



Cypress.Commands.add('acessarConfiguracoes',()=>{
  cy.visit('/' 
  )
  cy.get('#koopon-cabecalho-navbar-configuracoes .fa').click({ timeout: 10000 })
  cy.get('#koopon-cabecalho-navbar-configuracoes-geral-sistema').click({ timeout: 10000 })
})