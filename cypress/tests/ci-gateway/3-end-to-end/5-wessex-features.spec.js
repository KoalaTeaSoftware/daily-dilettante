describe('the Wessex - Features page', () => {
    /*
    This page is built directly using the HTMLS. Possibly this could ge busted
     */

    beforeEach(() => {
        cy.visit("storyworlds/wessex/features   ")
    })

    it('Greets the user', () => {
        cy.get("h1").should("contain.text", "Storyworlds")
        cy.get("h2").should("contain.text", "Wessex")
        cy.get("h3").should("contain.text", "Feature")
    })

    it('gets all the images', () => {
        cy.get('#wessex-features img').invoke('outerWidth').should('be.gt', 100)
    })

})