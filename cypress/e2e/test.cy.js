describe("Swiper Gallery Tests", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Allows the user to navigate slides using navigation buttons", function () {
    cy.get(".swiper-button-next").click();
    cy.wait(2000);
    cy.get(".swiper-slide-active").should("contain", "London");

    cy.get(".swiper-button-prev").click({ force: true });
    cy.wait(2000);
    cy.get(".swiper-slide-active").should("contain", "Rome");
  });

  it("Displays the description of each slide correctly", function () {
    cy.get(".swiper-slide-active")
      .should("contain", "Rome")
      .and("contain", "Italy");

    cy.get(".swiper-button-next").click({ force: true });
    cy.wait(2000);
    cy.get(".swiper-slide-active")
      .should("contain", "London")
      .and("contain", "United Kingdom");

    cy.get(".swiper-button-next").click({ force: true });
    cy.wait(2000);
    cy.get(".swiper-slide-active")
      .should("contain", "Paris")
      .and("contain", "France");
  });

  it("Adjusts the gallery layout across different devices", function () {
    // [width, height]
    const devices = [
      [1024, 768], // Tablet landscape
      [768, 1024], // Tablet portrait
      [375, 667], // Phone
    ];

    devices.forEach((size) => {
      cy.viewport(size[0], size[1]);
      cy.get(".swiper").should("be.visible");
      cy.get(".swiper-button-next").should("be.visible");
      cy.get(".swiper-button-prev").should("be.visible");
    });
  });

  it("Verifies that the gallery and all its elements are visible", function () {
    cy.get(".swiper").should("be.visible");

    cy.get(".swiper-slide").should("have.length", 3);

    cy.get(".swiper-button-next").should("be.visible").and("not.be.disabled");
    cy.get(".swiper-button-prev").should("be.visible").and("not.be.disabled");
  });
});
