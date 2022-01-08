describe('Initial glance at site', () =>{
    it('shows the welcome page', () =>{
        cy.visit('')
        it('Greets the user', () => {
            cy.get("h1").should("contain.text", "Welcome")
        })
    })

    it('shows the novels page', () =>{
        cy.visit('/novels')
        it('Greets the user', () => {
            cy.get("h1").should("contain.text", "Period Novels")
        })
    })

    it('shows the wessex podcasts page', () =>{
        cy.visit('/storyworlds/wessex/podcasts')
        it('Greets the user', () => {
            cy.get("h3").should("contain.text", "Podcast")
        })
    })

    it('shows the wessex films page', () =>{
        cy.visit('/storyworlds/wessex/features')
        it('Greets the user', () => {
            cy.get("h3").should("contain.text", "Feature")
        })
    })

    it('shows the about page', () =>{
        cy.visit('/about')
        it('Greets the user', () => {
            cy.get("h1").should("contain.text", "About")
        })
    })

    it('shows the policies page', () =>{
        cy.visit('/policies')
        it('Greets the user', () => {
            cy.get("h1").should("contain.text", "Policies")
        })
    })

    it('shows the contact page', () =>{
        cy.visit('/contact')
        it('Greets the user', () => {
            cy.get("h1").should("contain.text", "Contact")
        })
    })
})