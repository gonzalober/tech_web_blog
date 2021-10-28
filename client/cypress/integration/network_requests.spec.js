/// <reference types="Cypress" />

context("Network Requests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
});
