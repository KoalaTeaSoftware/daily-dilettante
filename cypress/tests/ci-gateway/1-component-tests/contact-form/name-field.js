require("../contactFormUtilities");
const {VALID_CHAR_POOL, INVALID_CHAR_POOL} = require("../contactFormUtilities");

describe('the robustness of the name field on the contact form', () => {
    const niceName = 'Teddy the special '
    const maxLen = 60

    beforeEach(() => {
        cy.visit('contact')
    })

    it('shows the prompt when the name field is not filled', () => {
        cy.get('#name-group .invalid-feedback').should('be.visible')
        cy.get('#name').clear().type("Ted")
        cy.get('#name-group .invalid-feedback').should('be.visible')
    })

    it('hides the prompt when the name field has enough chars', () => {
        cy.get('#name').clear()
            .type(niceName + chance.string({length: 5, pool: VALID_CHAR_POOL}))
        cy.get('#name-group .invalid-feedback').should('not.be.visible')
    })

    it('shows the prompt when the name field is given an invalid char', () => {
        let str = niceName
        str += chance.string({length: 5, pool: VALID_CHAR_POOL})
        str += ' '
        str += chance.string({length: 1, pool: INVALID_CHAR_POOL})

        cy.get('#name').clear()
            .type(str)
        cy.get('#name-group .invalid-feedback').should('be.visible')
    })

    it('prevents entry of too many chars into the name field', () => {
        cy.get('#name')
            .invoke('attr', 'maxlength')
            .then(str => parseInt(str)).should('be.lt', maxLen)
    })
})