require('chance');

const POOL = 'abcdefghijklmnopqrtsuvwxyz ABCDERGHIJKLMNONQRSTUVWXYZ1234567890.,-'

describe("The contact page - behaviour", () => {
    beforeEach(() => {
        cy.visit(" http://localhost:8080/contact")

        const email = chance.email()

        cy.get('#name').type(chance.sentence({words: 2}))
        cy.get('#address1').type(email)
        cy.get('#address2').type(email)
        cy.get('#subject').type(chance.sentence({words: 5}))
        cy.get('#message').type(chance.sentence())
    })

    // name field
    it('shows a prompt when name field is empty', () => {
        cy.get('#name').clear()
        cy.get('#name-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when name field contains an invalid character', () => {
        cy.get('#name').clear().type("Donald Duck")
        cy.get('#name-group .invalid-feedback').should('not.be.visible')
        cy.get('#name').type('{end};')
        cy.get('#name-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when name field contains insufficient data', () => {
        cy.get('#name').clear().type("Don")
        cy.get('#name-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('does not allow the user to enter too many characters into the name field', () => {
        const niceLen = 10
        const invalid = 55
        cy.get('#name').clear().type(chance.string({length: niceLen, pool: POOL}))
        cy.get('#name').invoke('val').should('have.length', niceLen)

        cy.get('#name').clear().type(chance.string({length: invalid, pool: POOL}))
        cy.get('#name').invoke('val').should('have.length.lessThan', invalid)

        cy.get('#message').should('not.be.disabled')
    })

    // email fields
    it('shows a prompt when the first email field is empty', () => {
        cy.get('#address1').clear()
        cy.get('#address-group-1 .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when the second email field is empty', () => {
        cy.get('#address2').clear()
        cy.get('#address-group-2 .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when both emails are different, but valid', () => {
        // this should eb teh starting state, with good email repeated in both
        cy.get('#address-group-1 .invalid-feedback').should('not.be.visible')
        cy.get('#address1').type('{end}a')
        cy.get('#address-group-1 .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when both emails are identical, but invalid', () => {
        cy.get('#address1').clear().type("abcde@efg")
        cy.get('#address2').clear().type("abcde@efg")
        cy.get('#address-group-1 .invalid-feedback').should('be.visible')
        cy.get('#address-group-2 .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    // subject field
    it('shows a prompt when the subject field is empty', () => {
        cy.get('#subject').clear()
        cy.get('#subject-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when the subject field contains an invalid character', () => {
        cy.get('#subject').clear().type("A valid string of letters")
        cy.get('#subject-group .invalid-feedback').should('not.be.visible')
        cy.get('#subject').type('{end};')
        cy.get('#subject-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when the subject field contains insufficient data', () => {
        cy.get('#subject').clear().type("asc")
        cy.get('#subject-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('does not allow the user to enter too many characters into the subject field', () => {
        const niceLen = 10
        const invalid = 55
        cy.get('#subject').clear().type(chance.string({length: niceLen, pool: POOL }))
        cy.get('#subject').invoke('val').should('have.length', niceLen)

        cy.get('#subject').clear().type(chance.string({length: invalid, pool: POOL}))
        cy.get('#subject').invoke('val').should('have.length.lessThan', invalid)

        cy.get('#message').should('not.be.disabled')
    })

    // // Message field
    it('shows a prompt when the message field is empty', () => {
        cy.get('#message').clear()
        cy.get('#message-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when the message field contains an invalid character', () => {
        cy.get('#message').clear().type("A valid string of letters")
        cy.get('#message-group .invalid-feedback').should('not.be.visible')
        cy.get('#message').type('{end};')
        cy.get('#message-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when the message field contains insufficient data', () => {
        cy.get('#message').clear().type("asc")
        cy.get('#message-group .invalid-feedback').should('be.visible')

        cy.get('#submitButton').should('be.disabled')
    })

    it('does not allow the user to enter too many characters into the message field', () => {
        const niceLen = 15
        const invalid = 1010
        cy.get('#message').clear().type(chance.string({length: niceLen, pool: POOL}))
        cy.get('#message').invoke('val').should('have.length', niceLen)

        cy.get('#message').clear().type(chance.string({length: invalid, pool: POOL}))
        cy.get('#message').invoke('val').should('have.length.lessThan', invalid)

        cy.get('#submitButton').should('not.be.disabled')
    })
})