const {INVALID_CHAR_POOL} = require("../contactFormUtilities");

describe('the robustness of the message field on the contact form', () => {
    const niceString = chance.sentence({words: 5})
    const maxLen = 600

    beforeEach(() => {
        cy.visit('contact')
    })

    it('shows the prompt when the message field is not filled', () => {
        cy.get('#message-group .invalid-feedback').should('be.visible')
        cy.get('#message').clear().type("too short")
        cy.get('#message-group .invalid-feedback').should('be.visible')
    })

    it('hides the prompt when the message field has enough chars', () => {
        cy.get('#message').clear()
            .type(niceString)
        cy.get('#message-group .invalid-feedback').should('not.be.visible')
    })

    it('shows the prompt when the message field is given an invalid char', () => {
        let str = niceString
        str += ' '
        str += chance.string({length: 1, pool: INVALID_CHAR_POOL})

        cy.get('#message').clear().type(str)
        cy.get('#message-group .invalid-feedback').should('be.visible')
    })

    it('prevents entry of too many chars into the message field', () => {
        cy.get('#message')
            .invoke('attr', 'maxlength')
            .then(str => parseInt(str)).should('be.lt', maxLen)
    })
})