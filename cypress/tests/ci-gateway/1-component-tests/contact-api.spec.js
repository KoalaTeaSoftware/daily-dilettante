import {makeFormData} from "../../../support/ContactFormUtilities";

describe('Sending mail is secured by server-side filtering', () => {
    let payload

    beforeEach(() => {
        // make up a well-built payload, but which will be recognised as a request to STUB
        payload = makeFormData()
    })

    it('Responds as expected to a well-formed stub-successfully request', () => {
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(200)
                expect(response.body).to.be.eq('Thank you Ted., that was nice.')
            })
    })

    it('Responds as expected to a well-formed stub-failure request', () => {
        const stat = 500
        payload.subject = `Give me a ${stat}`
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(stat)
                expect(response.body).to.be.eq('OK Ted., you asked for it.')
            })
    })

})