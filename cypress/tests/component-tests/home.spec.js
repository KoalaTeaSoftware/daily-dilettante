// home.spec.js created with Cypress
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

    it("Gets the welcome text from firebase", () => {
        cy.get('#welcome-1 p:nth-child(1)').should('not.contain', 'Loading')
        cy.get('#welcome-1 .loadingSpinner ').should('not.be.visible')
    })

    it('Builds the carousel correctly', () => {
        cy.get(".carousel-item > img").eq(0).should('be.visible')
        cy.get(".carousel-item").eq(1).should('not.be.visible')
        cy.get(".carousel-item").eq(1).invoke('height').should('gte', 100)

    })

    it('Gets the central text block from Firebase', () => {
        cy.get('#welcome-2 p:nth-child(1)').should('not.contain', 'Loading')
        cy.get('#welcome-2 .loadingSpinner ').should('not.be.visible')
    })

    it('Get the blog entry from Tumblr', () => {
        cy.get('.tumblrBlogRoll .post h2').should('be.visible')
        cy.get('.tumblrBlogRoll .post').should('not.contain', 'Loading')
        cy.get('.tumblrBlogRoll .loadingSpinner ').should('not.be.visible')

    })

    it('Proves a good link under the blog entry', () =>{
        cy.get('#blog-role .more')
            .should('have.attr', 'href')
            .and('match', /novels$/)
    })
})