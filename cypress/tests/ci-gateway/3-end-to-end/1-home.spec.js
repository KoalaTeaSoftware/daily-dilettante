// 1-home.spec.js created with Cypress
//
// The Firebase reader pushes the retrieved content into a P. In doing so, it bins the existing P
// and puts a new one in its place. Therefore, the assertion has to be near enough to the getter to re-trigger it.
describe("The home page", () => {
    beforeEach(() => {
        cy.visit("")
    })

    it('Greets the user', () => {
        cy.get("h1").should("contain.text", "Welcome")
    })

    it('Gets all the text blocks from Firebase', () => {
        cy.get('#welcome .editableDiv .editedContent p').should('not.contain', 'Loading')
        cy.get('#welcome .editableDiv .loadingSpinner ').should('not.be.visible')
    })

    it('gets all the images', () => {
        cy.get('#welcome img').invoke('outerWidth').should('be.gt', 100)
    })

    it('Builds the carousel OK', () => {
        cy.get(".carousel-item > img").eq(0).should('be.visible')
        cy.get(".carousel-item").eq(1).should('not.be.visible')
        cy.get(".carousel-item").eq(1).invoke('height').should('gte', 100)

        cy.get('.carousel-item > img').should('have.length.at.least', 3)
    })

    it('Get the blog entry from Tumblr', () => {
        // can't guarantee that Tumblr gives it 1, or 2, so accept either
        cy.get('.tumblrBlogRoll .post h1,.tumblrBlogRoll .post h2').should('be.visible')
        cy.get('.tumblrBlogRoll .post').should('not.contain', 'Loading')
        cy.get('.tumblrBlogRoll .loadingSpinner ').should('not.be.visible')
    })

    it('Proves a good link under the blog entry', () => {
        cy.get('#blog-role .more')
            .should('have.attr', 'href')
            .and('match', /novels$/)
    })
})