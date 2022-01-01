require('chance');
const mailHandler = require('../../fixtures/contact-mail-handler.config.json');

describe('Sending mail is secured by server-side filtering', () => {
    let payload

    beforeEach(() => {
        // make up a well-built payload, but which will be recognised as a request to STUB
        const address = chance.email()

        payload = {
            name: "Teddy the special tester",
            address1: address,
            address2: address,
            subject: "Pretend that you liked this message",
            message: chance.sentence()
        }
    })

    it('Responds as expected to a well-formed stub-successfully request', () => {
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: mailHandler.url,
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
            url: mailHandler.url,
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(stat)
                expect(response.body).to.be.eq('OK Ted., you asked for it.')
            })
    })

})