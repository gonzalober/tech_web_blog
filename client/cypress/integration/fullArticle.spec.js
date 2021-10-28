describe("Testing how to create post", () => {
  describe("add a post", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
    describe("checks if the full article is loaded and contains the elements", () => {
      it("checks that the user can read the full article", () => {
        cy.get(
          ":nth-child(1) > .wp-block-group > .col-md-6 > .col > .card-text"
        ).click();
        cy.location("pathname").should("include", "full-article");
        cy.get(".blog-post-title");
        cy.get(".blog-post-meta");
        cy.get(".font-content");
        cy.get(".blog-footer > :nth-child(1)");
        cy.get(".blog-footer > :nth-child(2) > a");
        cy.get(".button").click();
        cy.location("pathname").should("include", "");
      });
    });
  });
});
