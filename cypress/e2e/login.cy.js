describe("User Authentication", () => {
  describe("Login and Profile Access", () => {
    it("allows the user to log in and access their profile", () => {
      cy.visit("/");

      // Click login button without changing the default credentials
      cy.get(".login-btn").click();

      // Wait for the redirection delay
      cy.wait(3000); // Increased to account for the 2-second delay plus some buffer
      cy.url().should("include", "/Login"); // URL check for redirection to the home page, I have no idea why the homepge is called login
    });
  });

  describe('Logout', () => {
    it('allows the user to log out', () => {
      // Assuming the user is logged in from the previous test
      cy.visit('/profile');
      cy.get('.logout-btn').click();
  
      // Check if localStorage is cleared
      cy.window().then((win) => {
        expect(win.localStorage.length).to.equal(0);
      });
  
      // Check for the logout confirmation popup
      cy.contains('Logged out successfully!').should('be.visible');
  
    });
  });
  

  describe("Invalid Login Attempt", () => {
    it("does not allow login with invalid credentials", () => {
      cy.visit("/");

      // Clear default values and enter invalid credentials
      cy.get('input[placeholder="email"]')
        .clear()
        .type("invaliduser@stud.noroff.no");
      cy.get('input[placeholder="Password"]').clear().type("invalidpassword");

      cy.get(".login-btn").click();

      // Check for an error message or other indication of failed login
      cy.contains("An error occurred").should("be.visible");
    });
  });
});
