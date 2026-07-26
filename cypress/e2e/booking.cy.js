describe("Booking ticket", () => {
  let selectors;
  let users;

  beforeEach(() => {
    cy.fixture("selectors").then((data) => {
      selectors = data;
    });

    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  it("Should book a ticket in available hall", () => {
    cy.visit("/admin");

    cy.get(selectors.login.email).type(users.happyauthpass.login);

    cy.get(selectors.login.password).type(users.happyauthpass.password);

    cy.get(selectors.login.submit).click();

    cy.get(selectors.admin.hallList)
      .first()
      .invoke("text")
      .then((text) => {
        const hallName = text.trim();
        expect(hallName).not.to.be.empty;

        cy.visit("/");

        cy.contains(selectors.main.hallTitle, hallName)
          .should("exist")
          .parents(selectors.main.movie)
          .within(() => {
            cy.get(selectors.main.availableSession).first().click();
          });

        cy.get(selectors.booking.scheme).should("exist");

        cy.get(selectors.booking.title).should("not.be.empty");

        cy.get(selectors.booking.hall).should("contain.text", hallName);

        cy.get(selectors.booking.seat)
          .then(($seats) => {
            expect($seats.length).to.be.greaterThan(0);
          })
          .first()
          .click();

        cy.get(selectors.booking.selectedSeat).should("exist");

        cy.get(selectors.booking.bookButton).click();

        cy.get(selectors.ticket.title).should("not.be.empty");

        cy.get(selectors.ticket.chairs).should("not.be.empty");

        cy.get(selectors.ticket.hall).should("contain.text", hallName);

        cy.get(selectors.ticket.confirmButton).should("be.visible");
      });
  });
});