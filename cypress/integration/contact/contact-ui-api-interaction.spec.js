require('chance');

let dummyResp
let dummyData

const successContains = 'Thank you for your message'

describe("The contact page - interface - outgoing and incoming", () => {
    beforeEach(() => {
        const email = chance.email()
        dummyData = {
            "name": chance.sentence({words: 2}),
            "address1": email,
            "address2": email,
            "subject": chance.sentence({words: 3}),
            "message": chance.sentence()
        }

        dummyResp = {
            statusCode: 500,
            body: {
                msg: "A dummy error message"
            }
        }

        cy.visit(" http://localhost:8080/contact")

        cy.get('#name').type(dummyData.name)
        cy.get('#address1').type(dummyData.address1)
        cy.get('#address2').type(dummyData.address2)
        cy.get('#subject').type(dummyData.subject)
        cy.get('#message').type(dummyData.message)
    })

    it('will send good data to the mail handler', () => {
        cy.intercept(
            'POST',
            'https://us-central1-daily-dilettante.cloudfunctions.net/sendMail',
            dummyResp
        ).as('sendMailCall')

        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
            .its('request.body')
            .should('deep.equal', JSON.stringify(dummyData))
    })

    it('provides feedback from the API to the user from a successful sending', () =>{
        dummyResp.statusCode = 200
        cy.intercept(
            'POST',
            'https://us-central1-daily-dilettante.cloudfunctions.net/sendMail',
            dummyResp
        ).as('sendMailCall')

        cy.get('#server-feedback').should('not.be.visible')

        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#server-feedback')
            .should('be.visible')
            .should('contain', successContains)
    })

    it('provides feedback from the API to the user from a sending failure', () =>{
        cy.intercept(
            'POST',
            'https://us-central1-daily-dilettante.cloudfunctions.net/sendMail',
            dummyResp
        ).as('sendMailCall')

        cy.get('#server-feedback').should('not.be.visible')

        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#server-feedback')
            .should('be.visible')
            .should('not.contain', successContains)
    })
})