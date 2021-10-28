describe("Testing Home Page", () => {
  describe("DOM elements and blog posts Displayed", () => {
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

      // cy.location("pathname").should("include", "createrace");
      // cy.get("h1").contains("CatchMe");
      // cy.get('[class="lobby-page"]').contains("Lobby");
      // cy.get('[alt="home-icon"]').should("be.visible");
      // cy.get("p").contains("Code");
      // cy.get("p").contains("Distance: 10m");
      // cy.get("p").contains("Participants");
      // cy.get('[class="user-details"]').contains("Jules");
      // cy.get("button").contains("Ready!").click();
      // cy.get('img[alt="start-button"]').click();
      // cy.location("pathname").should("include", "race");
      // cy.get("h1").contains("CatchMe");
      // cy.get('[class="race-details"]').contains("Jules");
      // cy.get("p").contains("0.00");
      // cy.get("h2").contains("Time");
      // cy.get('[class="stopwatch__display"]').should("be.visible");
    });
  });
});
