describe("Admin login page", () => {
  let selectors;
  let users;

  beforeEach(() => {
    cy.fixture("selectors").then((data) => {
      selectors = data;
    });

    cy.fixture("users").then((data) => {
      users = data;
    });

    cy.visit("/admin");
  });

  it("Should login with valid credentials", () => {
    cy.get(selectors.login.email).type(users.happyauthpass.login);
    cy.get(selectors.login.password).type(users.happyauthpass.password);
    cy.get(selectors.login.submit).click();
    cy.url().should("include", "/admin");
    cy.contains("Управление залами").should("be.visible");
  });

  it("Should show validation error for invalid email", () => {
    cy.get(selectors.login.email).type("admin");
    cy.get(selectors.login.submit).click();
    cy.get(selectors.login.email).then(($input) => {
      expect($input[0].validationMessage).to.not.equal("");
    });
  });

  it("Should not login with invalid credentials", () => {
    cy.get(selectors.login.email).type(users.happyauthpass.login);
    cy.get(selectors.login.password).type(users.sadauthpass.password);
    cy.get(selectors.login.submit).click();
    cy.contains("Ошибка авторизации!").should("be.visible");
  });

  it("Should collapse hall configuration section", () => {
    cy.get(selectors.login.email).type(users.happyauthpass.login);

    cy.get(selectors.login.password).type(users.happyauthpass.password);

    cy.get(selectors.login.submit).click();

    cy.get(selectors.admin.hallConfiguration)
      .find(selectors.admin.sectionHeader)
      .click();

    cy.get(selectors.admin.hallConfiguration)
      .find(selectors.admin.sectionHeader)
      .should("have.class", "conf-step__header_closed");

    cy.get(selectors.admin.hallConfiguration)
      .find(selectors.admin.sectionWrapper)
      .should("not.be.visible");
  });

  it("Should display logout button for admin", () => {
    cy.get(selectors.login.email).type(users.happyauthpass.login);

    cy.get(selectors.login.password).type(users.happyauthpass.password);

    cy.get(selectors.login.submit).click();

    cy.get(selectors.admin.logoutButton).should("be.visible");
  });
});
