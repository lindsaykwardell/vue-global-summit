describe("Test Runner post-typescript", () => {
  it("allows adding new tests", () => {
    cy.visit(Cypress.config().baseUrl + "/");
    cy.url().should("include", "/login");
    cy.get("input").click().type("username");
    cy.get("button").click();
    cy.get("nav").findByText("Admin Panel").click();
    cy.get("ul > li").should("have.length", 6);
    cy.get("input").click().type("A new test approaches.");
    cy.get("button").click();
    cy.get("ul > li").should("have.length", 7);
    cy.get("nav").findByText("Tester").click();
    cy.get("ul > li").should("have.length", 7);
    cy.findByText("Start Tests").click();
    cy.findByText("All tests have completed!").should("exist");
  });
});
