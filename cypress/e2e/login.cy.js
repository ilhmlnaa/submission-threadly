describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login', { timeout: 60000 });
    cy.get('body', { timeout: 10000 }).should('be.visible');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="your@email.com"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.match(/email/i);
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="your@email.com"]').type('test@example.com');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.match(/password/i);
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="your@email.com"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.match(/wrong/i);
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="your@email.com"]').type('ilham@hamdiv.me');
    cy.get('input[type="password"]').type('ilham789');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('nav', { timeout: 10000 }).should('be.visible');
    cy.get('button')
      .contains(/logout/i, { timeout: 10000 })
      .should('be.visible');
  });
});
