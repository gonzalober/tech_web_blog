describe("Testing how to create post", () => {
  describe("add a post", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
    it("a", () => {
      cy.visit("/");
      cy.location("pathname").should("include", "");
      cy.get("[data-testid=post-title-input]");
      cy.get("[data-testid=post-content-input]");
      cy.get("[data-testid=post-username-input]");
      cy.get("form");
      cy.get("form > .button");
      cy.get(".blog-footer > :nth-child(1)");
      cy.get(".blog-footer > :nth-child(2)");
      cy.get("[data-testid=post-username-input]").type("Elon");
      cy.get("[data-testid=post-title-input]").type("Space-X");
      cy.get("[data-testid=post-content-input]").type("Space-X");
      // cy.get('input[type="text"]').type("Jules");
      cy.get("form > .button").click();
      cy.get(":nth-child(4) > .wp-block-group > .col-md-6");
    });
  });
});
