// 1-home.spec.js created with Cypress
//
// The Firebase reader pushes the retrieved content into a P. In doing so, it bins the existing P
// and puts a new one in its place. Therefore, the assertion has to be near enough to the getter to re-trigger it.
describe("The Period Novels and their Films page", () => {
    beforeEach(() => {
        cy.visit("novels")
    })

    it('Greets the user', () => {
        cy.get("h1").should("contain.text", "Period Novels and their Films")
    })

    it('Gets all the text blocks from Firebase', () => {
        cy.get('#novels .editableDiv .editedContent p').should('not.contain', 'Loading')
        cy.get('#novels .editableDiv .loadingSpinner ').should('not.be.visible')
    })


    it('Get the blog roll from Tumblr', () => {
        cy.get('#blog-roll .post p').should('be.visible')
        cy.get('#blog-roll .post').should('not.contain', 'Loading')
        cy.get('#blog-roll .loadingSpinner ').should('not.be.visible')

    })

    it('Proves a good link under the blog roll', () => {
        cy.get('.postListTail .more')
            .should('have.attr', 'href')
            .and('match', /^https:\/\/dailydilettante.tumblr.com\/$/)
    })

    it('Get the video roll from Tumblr', () => {
        cy.get('#vid-roll .post p').should('be.visible')
        cy.get('#vid-roll .post').should('not.contain', 'Loading')
        cy.get('#vid-roll .loadingSpinner ').should('not.be.visible')

    })

    it('Proves a good link under the video roll', () => {
        cy.get('.postListTail .more')
            .should('have.attr', 'href')
            .and('match', /^https:\/\/dailydilettante.tumblr.com\/$/)
    })

})