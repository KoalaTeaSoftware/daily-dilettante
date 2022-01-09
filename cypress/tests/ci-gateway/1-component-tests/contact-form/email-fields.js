describe('the robustness of the first email field on the contact form', () => {
    let sampleAddress = ''

    beforeEach(() => {
        sampleAddress = chance.email()
        cy.visit('contact')
    })

    it('shows the prompt when the first email field is empty', () => {
        cy.get('#address1').clear()
        cy.get('#address-group-1 .invalid-feedback').should('be.visible')
    })

    it('shows the prompt when the second email field is empty', () => {
        cy.get('#address2').clear()
        cy.get('#address-group-2 .invalid-feedback').should('be.visible')
    })


    it('hides the prompt when both emails contain a matching valid address', () => {
        cy.get('#address1').clear().type(sampleAddress)
        cy.get('#address-group-1 .invalid-feedback').should('be.visible')
        cy.get('#address-group-2 .invalid-feedback').should('be.visible')

        cy.get('#address2').clear().type(sampleAddress)
        cy.get('#address-group-1 .invalid-feedback').should('not.be.visible')
        cy.get('#address-group-2 .invalid-feedback').should('not.be.visible')
    })


    it('shows the prompt when both emails contain a non-matching valid address', () => {
        cy.get('#address1').clear().type(sampleAddress)
        cy.get('#address2').clear().type(sampleAddress + '{backspace}')
        cy.get('#address-group-1 .invalid-feedback').should('be.visible')
        cy.get('#address-group-2 .invalid-feedback').should('be.visible')
    })


    it('prevents entry of non emails into the  first email field', () => {
        cy.get('#address1')
            .invoke('attr', 'type')
            .should('eq', 'email')
    })

    it('prevents entry of non emails into the  second email field', () => {
        cy.get('#address2')
            .invoke('attr', 'type')
            .should('eq', 'email')
    })
})