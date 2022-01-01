require('chance');

const mailHandler = require('../../fixtures/contact-mail-handler.config.json');

const VALID_POOL = 'abcdefghijklmnopqrtsuvwxyz ABCDERGHIJKLMNONQRSTUVWXYZ1234567890.,-'
const INVALID_POOL = '<>{}[]^|\\`'

describe("The contact page - behaviour", () => {
    let name
    let address1
    let address2
    let subject
    let message

    beforeEach(() => {
        cy.visit("contact")

        const email = chance.email()
        name = chance.sentence({words: 2})
        address1 = email
        address2 = email
        subject = chance.sentence({words: 5})
        message = chance.sentence()

        cy.get('#name').type(name)
        cy.get('#address1').type(address1)
        cy.get('#address2').type(address2)
        cy.get('#subject').type(subject)
        cy.get('#message').type(message)
    })

    // name field
    it('shows a prompt when name field is empty', () => {
        cy.get('#name').clear()

        cy.get('#name-group .invalid-feedback').should('be.visible')
        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when name field contains an invalid character', () => {
        // type in good stuff
        cy.get('#name').clear().type("Donald Duck")
        cy.get('#name-group .invalid-feedback').should('not.be.visible')

        // type a bad one
        cy.get('#name').type('{end}' + chance.string({length: 1, pool: INVALID_POOL}))

        cy.get('#name-group .invalid-feedback').should('be.visible')
        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when name field contains insufficient data', () => {
        cy.get('#name').clear().type("Don")

        cy.get('#name-group .invalid-feedback').should('be.visible')
        cy.get('#submitButton').should('be.disabled')
    })

    it('does not allow the user to enter too many characters into the name field', () => {
        // prove that it does allow good input
        const niceLen = 10
        cy.get('#name').clear().type(chance.string({length: niceLen, pool: VALID_POOL}))
        cy.get('#name').invoke('val').should('have.length', niceLen)

        // prove that it excessive input
        const invalid = 55
        cy.get('#name').clear().type(chance.string({length: invalid, pool: VALID_POOL}))

        cy.get('#name').invoke('val').should('have.length.lessThan', invalid)
        // as the basic data is all valid, and the message data has been prevented from getting too big ...
        cy.get('#submitButton').should('not.be.disabled')
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

    // // subject field
    it('shows a prompt when the subject field is empty', () => {
        cy.get('#subject').clear()

        cy.get('#subject-group .invalid-feedback').should('be.visible')
        cy.get('#submitButton').should('be.disabled')
    })

    it('shows a prompt when the subject field contains an invalid character', () => {
        // OK for good shit
        cy.get('#subject').clear().type("A valid string of letters")
        cy.get('#subject-group .invalid-feedback').should('not.be.visible')

        cy.get('#subject').type('{end}' + chance.string({length: 1, pool: INVALID_POOL}))

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
        cy.get('#subject').clear().type(chance.string({length: niceLen, pool: VALID_POOL }))
        cy.get('#subject').invoke('val').should('have.length', niceLen)

        const invalid = 55
        cy.get('#subject').clear().type(chance.string({length: invalid, pool: VALID_POOL}))

        cy.get('#subject').invoke('val').should('have.length.lessThan', invalid)
        cy.get('#submitButton').should('not.be.disabled')
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
        cy.get('#message').type('{end}' + chance.string({length: 1, pool: INVALID_POOL}))

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
        cy.get('#message').clear().type(chance.string({length: niceLen, pool: VALID_POOL}))
        cy.get('#message').invoke('val').should('have.length', niceLen)

        const invalid = 1010
        cy.get('#message').clear().type(chance.string({length: invalid, pool: VALID_POOL}))

        cy.get('#message').invoke('val').should('have.length.lessThan', invalid)
        cy.get('#submitButton').should('not.be.disabled')
    })

    it('clears all fields when the reset button is clicked', () =>{
        // checking this because the script cleans up the component's variables
        cy.get('#resetButton').click()

        cy.get('#name').invoke('val').should('be.empty')
        cy.get('#address1').invoke('val').should('be.empty')
        cy.get('#address2').invoke('val').should('be.empty')
        cy.get('#subject').invoke('val').should('be.empty')
        cy.get('#message').invoke('val').should('be.empty')
    })

    it('locks all fields when the send button is clicked', () =>{
        const realSendPreventer = {
            statusCode: 200,
            body: "Something that is irrelevant, but might as well be specified"
        }

        cy.intercept(
            'POST',
            mailHandler.url,
            realSendPreventer
        ).as('sendMailCall')

        cy.get('#server-feedback').should('not.be.visible')

        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#name').should('be.disabled').invoke('val').should('eq', name)
        cy.get('#address1').should('be.disabled').invoke('val').should('eq', address1)
        cy.get('#address2').should('be.disabled').invoke('val').should('eq', address2)
        cy.get('#subject').should('be.disabled').invoke('val').should('eq', subject)
        cy.get('#message').should('be.disabled').invoke('val').should('eq', message)

        cy.get('#submitButton').should('be.disabled')
        cy.get('#resetButton').should('be.disabled') // force a complete redraw of the page

    })
})