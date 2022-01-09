require('chance');

describe("special info pages", () => {
    /*
    The pages are simple pages that allow for a wiki-style listing of information that is thought to be useful to actors, and crew
     */
    let auth
    let book
    let medium

    beforeEach(() => {
        // want to be able to handle author names like Sir Walter Scott (although there is no defining this here
        // similarly book names probably contain a handful of words
        // if more than one word of each element is handled, then on only should be OK

        // sentences end with a full stop, so cut them off
        auth = chance.sentence({words: 3}).replace(/\./, '')
        book = chance.sentence({words: 5}).replace(/\./, '')
        medium = 'movie' // the other allowed value is 'podcast'
    })

    it('displays the right page determined by the path of the location', () => {
        // notice that all paths are constructed using hyphens in the words
        const testAddress = `/${auth}/${book}/${medium}`.replace(/\s+/g, '-')

        // should() could be easier, but it is case sensitive. The only way I have found it to use a regexp
        const authTest = new RegExp('^' + auth + '$', 'i')
        const bookTest = new RegExp('^' + book + '$', 'i')
        const mediumTest = new RegExp('^' + medium + '$', 'i')


        cy.visit(testAddress)

        cy.get('#author').contains(authTest)
        cy.get('#book').contains(bookTest)
        cy.get('#medium').contains(mediumTest)
    })


    it('manufactures the name of the editable div', () => {
        const testAddress = `/${auth}/${book}/${medium}`.replace(/\s+/g, '-')

        cy.visit(testAddress)

        cy.get('.editableDiv')
            .invoke('attr', 'id')
            .then(id => {
                const bits = id.split('_')
                expect(bits).to.have.length(4)
                expect(bits[0]).to.eq('info')
                expect(bits[1]).to.eq(medium.replace(/\s+/g, '-').toLowerCase())
                expect(bits[2]).to.eq(auth.replace(/\s+/g, '-').toLowerCase())
                expect(bits[3]).to.eq(book.replace(/\s+/g, '-').toLowerCase())
            })
    })

    it('defaults to the podcast page of when the final component of the path is totally omitted', () => {
        const testAddress = `/${auth}/${book}`.replace(/\s+/g, '-')

        cy.visit(testAddress)

        const authTest = new RegExp('^' + auth + '$', 'i')
        const bookTest = new RegExp('^' + book + '$', 'i')
        const mediumTest = new RegExp('^podcast$', 'i')

        cy.get('#author').contains(authTest)
        cy.get('#book').contains(bookTest)
        cy.get('#medium').contains(mediumTest)
    })

    it('defaults the podcast page when the final component of the path is partially omitted', () => {
        const testAddress = `/${auth}/${book}/`.replace(/\s+/g, '-')

        cy.visit(testAddress)

        const authTest = new RegExp('^' + auth + '$', 'i')
        const bookTest = new RegExp('^' + book + '$', 'i')
        const mediumTest = new RegExp('^podcast$', 'i')

        cy.get('#author').contains(authTest)
        cy.get('#book').contains(bookTest)
        cy.get('#medium').contains(mediumTest)
    })

    it('Shows the podcast page when the final final component of the path specifies that', () => {
        const testAddress = `/${auth}/${book}/podcast`.replace(/\s+/g, '-')

        cy.visit(testAddress)

        const authTest = new RegExp('^' + auth + '$', 'i')
        const bookTest = new RegExp('^' + book + '$', 'i')
        const mediumTest = new RegExp('^podcast$', 'i')

        cy.get('#author').contains(authTest)
        cy.get('#book').contains(bookTest)
        cy.get('#medium').contains(mediumTest)
    })

    it('goes Home for any medium other than podcast, or movie', () => {
        // for most of the other tests, we have been using kosher medium elements (movie), so
        // adequate coverage is got from just putting some random guff in
        // a word 6 chars long is not going to be one of the approved words

        medium = chance.word({length: 6}).replace(/\./, '')

        const testAddress = `/${auth}/${book}/${medium}`.replace(/\s+/g, '-')

        cy.visit(testAddress)

        cy.location('pathname').should('eq', '/')
        cy.get('h1').contains('Welcome')
    })

})