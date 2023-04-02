// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it("Works fine", () => {
  cy.visit("https://example.cypress.io/");
  cy.contains("h2", "Commands");
});

it(
  "Fails but shouldnt retry",
  { tags: ["@smoke", "@test"], retries: 2, defaultCommandTimeout: 1000 },
  () => {
    cy.visit("https://example.cypress.io/");
    cy.contains("h2", "Commas");
  }
);

it(
  "Fails but retry as it has flaky tag",
  { tags: ["@smoke", "@flaky"], retries: 2, defaultCommandTimeout: 1000 },
  () => {
    cy.visit("https://example.cypress.io/");
    cy.contains("h2", "Commads");
  }
);

afterEach(() => {
  if (cy.state("test").state === "failed") {
    if (
      cy.state("test")._testConfig.unverifiedTestConfig.tags &&
      !cy.state("test")._testConfig.unverifiedTestConfig.tags.includes("@flaky")
    ) {
      cy.state("test")._testConfig.testConfigList[0].overrides.retries = -1;
    }
  }
});
