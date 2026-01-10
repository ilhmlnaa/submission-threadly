describe('Register spec', () => {
  const randomId = Math.floor(Math.random() * 100000);
  const name = `testuser-${randomId}`;
  const email = `email-${randomId}@gmail.com`;
  const password = 'password12345678';

  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
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

    cy.get('input[id="name"]:invalid').should('have.length', 1);
  });

  it('should display error message when email is empty', () => {
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="password"]').type(password);
    cy.get('button')
      .contains(/create account/i)
      .click();

    cy.get('input[id="email"]:invalid').should('have.length', 1);
  });

  it('should display error message when password is empty', () => {
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="email"]').type(email);
    cy.get('button')
      .contains(/create account/i)
      .click();

    cy.get('input[id="password"]:invalid').should('have.length', 1);
  });

  // Di sini saya komentari karna server backend nya kena bot protection/WAF AWS saat di hit dari github action/vps saja, tapi di lokal aman
  // it('should register successfully and navigate to login page', () => {
  //   cy.get('input[id="name"]').type(name);
  //   cy.get('input[id="email"]').type(email);
  //   cy.get('input[id="password"]').type(password);
  //   cy.get('button')
  //     .contains(/create account/i)
  //     .click();

  //   cy.url().should('include', '/login');
  //   cy.get('input[id="email"]').should('be.visible');
  // });
});
