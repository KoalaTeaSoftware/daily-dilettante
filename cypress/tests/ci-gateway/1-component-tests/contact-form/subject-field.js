require("../contactFormUtilities");
const {INVALID_CHAR_POOL, VALID_CHAR_POOL} = require("../contactFormUtilities");

describe('the robustness of the subject field on the contact form', () => {
    const niceString = 'My subject is '
    const maxLen = 60

    beforeEach(() => {
        cy.visit('contact')
    })

    it('shows the prompt when the subject field is not filled', () => {
        cy.get('#subject-group .invalid-feedback').should('be.visible')
        cy.get('#subject').type("Ted")
        cy.get('#subject-group .invalid-feedback').should('be.visible')
    })

    it('hides the prompt when the subject field has enough chars', () => {
        cy.get('#subject')
            .type(niceString + chance.string({length: 5, pool: VALID_CHAR_POOL}))
        cy.get('#subject-group .invalid-feedback').should('not.be.visible')
    })

    it('shows the prompt when the subject field is given an invalid char', () => {
        let str = niceString
        str += chance.string({length: 1, pool: INVALID_CHAR_POOL})

        cy.get('#subject').type(str)
        cy.get('#subject-group .invalid-feedback').should('be.visible')
    })

    it('prevents entry of too many chars into the subject field', () => {
        cy.get('#subject')
            .invoke('attr', 'maxlength')
            .then(str => parseInt(str)).should('be.lt', maxLen)
    })
})