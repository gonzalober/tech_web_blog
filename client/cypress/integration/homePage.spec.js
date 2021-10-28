describe("Testing Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  describe("DOM elements and blog posts Displayed", () => {
    it("it checks the header displyed and body", () => {
      cy.visit("/");
      cy.location("pathname").should("include", "");
      cy.get(".blog-header-logo");
      cy.get(":nth-child(1) > .wp-block-group > .col-md-6");
      cy.get(
        ":nth-child(1) > .wp-block-group > .col-md-6 > :nth-child(3) > span"
      );
      cy.get("form");
    });
  });

  it("checks that all the input form elements work as they should", () => {
    cy.visit("/");
    cy.location("pathname").should("include", "");
    cy.get("[data-testid=post-title-input]");
    cy.get("[data-testid=post-content-input]");
    cy.get("[data-testid=post-username-input]");
    cy.get("form");
    cy.get("form > .button");
  });

  // it.only("mocking get posts", () => {
  //   cy.intercept("GET", "/", {
  //     title: "Hello",
  //     content: "World",
  //     username: "snowden",
  //   }).as("posts");
  //   cy.get(cy.get(":nth-child(9) > .wp-block-group > .col-md-6"));
  //   cy.wait("@posts");
  // });

  // it("checks that the post can be deleted", () => {
  //   cy.intercept({
  //     path: "/",
  //   }).as("/");

  //   cy.get("form > .button").click();
  //   cy.wait("@/").then((inter) => {
  //     cy.log(JSON.stringify(inter));
  //     expect(inter.response.body);
  //   });
  // });
});
