require('chance');
const mailHandler = require('../../fixtures/contact-mail-handler.config.json');

let dummyResp
let dummyData

const successContains = 'Thank you'
const failureContains = 'could not'

describe("The contact page - interface - outgoing and incoming", () => {
    beforeEach(() => {
        // go to the page and enter some dummy data
        const email = chance.email()

        dummyData = {
            name: chance.sentence({words: 2}),
            address1: email,
            address2: email,
            subject: chance.sentence({words: 3}),
            message: chance.sentence()
        }

        dummyResp = {
            statusCode: 500,
            body: "A dummy error message"

        }

        cy.visit("contact")

        cy.get('#name').type(dummyData.name)
        cy.get('#address1').type(dummyData.address1)
        cy.get('#address2').type(dummyData.address2)
        cy.get('#subject').type(dummyData.subject)
        cy.get('#message').type(dummyData.message)
    })

    it('will send good data to the mail handler', () => {
        cy.intercept(
            'POST',
            mailHandler.url,
            dummyResp
        ).as('sendMailCall')

        cy.get('#submitButton').click()

        // you have to wait before trying to get
        cy.wait('@sendMailCall')
        cy.get('@sendMailCall')
            .its('request')
            .its('body')
            .then(body => {
                expect(body.name).to.eq(dummyData.name)
                expect(body.address1).to.eq(dummyData.address1)
                expect(body.address2).to.eq(dummyData.address2)
                expect(body.subject).to.eq(dummyData.subject)
                expect(body.message).to.eq(dummyData.message)
            })
    })

    it('provides feedback from the API to the user from a successful sending', () => {
        dummyResp.statusCode = 200

        cy.intercept(
            'POST',
            mailHandler.url,
            dummyResp
        ).as('sendMailCall')

        cy.get('#server-feedback').should('not.be.visible')

        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#server-feedback')
            .should('be.visible')
            .should('contain', successContains)
            .should('not.contain', failureContains)
    })

    it('provides feedback from the API to the user from a sending failure', () => {
        cy.intercept(
            'POST',
            mailHandler.url,
            dummyResp
        ).as('sendMailCall')

        cy.get('#server-feedback').should('not.be.visible')

        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#server-feedback')
            .should('be.visible')
            .should('not.contain', successContains)
            .should('contain', failureContains)
    })
})