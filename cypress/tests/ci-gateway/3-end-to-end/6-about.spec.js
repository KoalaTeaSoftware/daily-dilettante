// 1-home.spec.js created with Cypress
//
// The Firebase reader pushes the retrieved content into a P. In doing so, it bins the existing P
// and puts a new one in its place. Therefore, the assertion has to be near enough to the getter to re-trigger it.
describe("The home page", () => {
    beforeEach(() => {
        cy.visit("about")
    })

    it('Greets the user', () => {
        cy.get("h1").should("contain.text", "About the Editor")
    })

    it('Gets all the text blocks from Firebase', () => {
        cy.get('#about .editableDiv .editedContent p').should('not.contain', 'Loading')
        cy.get('#about .editableDiv .loadingSpinner ').should('not.be.visible')
    })

    it('gets all the images', () => {
        cy.get('#about img').invoke('outerWidth').should('be.gt', 100)
    })

    it('shows the right number of rose-as pieces', () => {
        cy.get('#rose-as h2').should('have.length', 4)
        cy.get('#rose-as img').should('have.length', 3) // one have a movie
        cy.get('#rose-as .editedContent p').should('have.length.at.least', 4) // there may be more than 1 in each
    })
})