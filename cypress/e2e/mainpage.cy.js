describe("Main page", () => {
  let selectors;

  beforeEach(() => {
    cy.fixture("selectors").then((data) => {
      selectors = data;
    });

    cy.visit("/");
  });

  it("Should main page visible", () => {
    cy.get(selectors.main.movie).should("exist");
  });

  it("Should display a list of movies", () => {
    cy.get(selectors.main.movie)
      .should("exist")
      .and("have.length.greaterThan", 0);
  });

  it("Should every film must have a title", () => {
    cy.get(selectors.main.movieTitle).each(($title) => {
      cy.wrap($title)
        .should("be.visible")
        .invoke("text")
        .should("not.be.empty");
    });
  });

  it("Should days be displayed", () => {
    cy.get(selectors.main.day).should("exist").and("have.length", 7);
  });

  it("Should sessions be displayed", () => {
    cy.get(selectors.main.session)
      .should("exist")
      .and("have.length.greaterThan", 0);
  });

  it("Should at least one available session must exist", () => {
    cy.get(selectors.main.availableSession)
      .should("exist")
      .and("have.length.greaterThan", 0);
  });
});