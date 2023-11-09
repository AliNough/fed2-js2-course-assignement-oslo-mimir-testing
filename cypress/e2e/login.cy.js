
describe('Logs in', () => {
  it('logs in the user', () => {


    cy.visit('localhost:5173');
    cy.contains('.login-btn').click();

    //
    cy.get('input[placeholder="Username"]').type('newuser');
    cy.get('input[placeholder="Email"]').type('newuser@example.com');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('input[placeholder="Confirm Password"]').type('password123');

    // Locate the submit button by text and click on it to submit the form
    cy.contains('button', 'Sign Up').click();

    // Check if the URL is correct
    // Replace it with the correct route if different
    cy.url().should('include', '/');
    
    // Check if the modal with the success message is displayed
    cy.contains('h2', 'Hi newuser!').should('be.visible');
    cy.contains('p', 'Welcome and thank you for signing up!').should('be.visible');
    
    // Optional: Check for the presence of JWT in localStorage
    cy.window().its('localStorage.jwt').should('exist');
  });
});

