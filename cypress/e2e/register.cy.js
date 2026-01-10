describe('Register spec', () => {
  const randomId = Math.floor(Math.random() * 100000);
  const name = `testuser-${randomId}`;
  const email = `email-${randomId}@gmail.com`;
  const password = 'password12345678';

  beforeEach(() => {
    cy.visit('http://localhost:5173/register', { timeout: 60000 });
    cy.get('body', { timeout: 10000 }).should('be.visible');
  });

  it('should display register page correctly', () => {
    cy.get('input[id="name"]').should('be.visible');
    cy.get('input[id="email"]').should('be.visible');
    cy.get('input[id="password"]').should('be.visible');
    cy.get('button')
      .contains(/create account/i)
      .should('be.visible');
  });

  it('should display error message when name is empty', () => {
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);
    cy.get('button')
      .contains(/create account/i)
      .click();

    // Verification of required field (HTML5 validation)
    cy.get('input[id="name"]:invalid').should('have.length', 1);
  });

  it('should display error message when email is empty', () => {
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="password"]').type(password);
    cy.get('button')
      .contains(/create account/i)
      .click();

    // Verification of required field (HTML5 validation)
    cy.get('input[id="email"]:invalid').should('have.length', 1);
  });

  it('should display error message when password is empty', () => {
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="email"]').type(email);
    cy.get('button')
      .contains(/create account/i)
      .click();

    // Verification of required field (HTML5 validation)
    cy.get('input[id="password"]:invalid').should('have.length', 1);
  });

  it('should register successfully and navigate to login page', () => {
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);
    cy.get('button')
      .contains(/create account/i)
      .click();

    // Wait for redirection to login page
    cy.url().should('include', '/login');
    cy.get('input[id="email"]').should('be.visible');
  });
});
