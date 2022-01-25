describe('the Wessex - Podcast page', () => {
    /*
    This page is built directly from JSON in the page. Possibly this could get busted
     */

    beforeEach(() => {
        cy.visit("storyworlds/wessex/podcasts")
    })

    it('Greets the user', () => {
        cy.get("h1").should("contain.text", "Storyworlds")
        cy.get("h2").should("contain.text", "Wessex")
        cy.get("h3").should("contain.text", "Podcast")
    })

    it('shows enough items', () => {
        cy.get('h4').should('have.length', 3)
        cy.get('.series img').should('have.length', 3)
        cy.get('.series audio').should('have.length.at.least', 1)
        cy.get('.series p').should('have.length.at.least', 3)
    })

    // it('can get the specified audio files', () =>{
    //     cy.get('.series audio')
    //         .its('src')
    //         .should('have.text')
    // cy.request('http://mcdn.podbean.com/mf/web/s6wefq/DesperateRemediesEp_1.mp3')
    // })

    it('gets all the images', () => {
        cy.get('#wessex-podcasts img').invoke('outerWidth').should('be.gt', 100)
    })

})
