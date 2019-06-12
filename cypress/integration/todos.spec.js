/// <reference types="Cypress" />

context("Todos", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds new todo", () => {
    cy.get('input[type="text"]')
      .type("Add Cypress")
      .should("have.value", "Add Cypress");

    cy.get("button.add").click();

    cy.get("li").should("have.length", 4);
    cy.get("li:last span").should("have.text", "Add Cypress");
    cy.get("li:last input").should("not.be.checked");
  });

  it("adds multiple todos", () => {
    for (let i = 0; i < 5; i++) {
      cy.get('input[type="text"]')
        .type(`New item (${i+1})`)
        .should("have.value", `New item (${i+1})`);
      cy.get("button.add").click();
    }

    cy.get("li").should("have.length", 8);
  });

  it("marks a todo as done", () => {
    cy.get("li:nth-of-type(3) input")
      .check()
      .should("be.checked");
  });

  it("marks a todo as not done", () => {
    cy.get("li:nth-of-type(1) input")
      .uncheck()
      .should("not.be.checked");
  });

  it("remove all todos", () => {
    cy.get("li button").click({ multiple: true });
    cy.get("li").should("have.length", 0);
  });
});
