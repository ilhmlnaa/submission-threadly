/**
 * - LoginInput component spec
 *   - should render LoginInput component correctly
 *   - should call login function with correct data when form is submitted
 *   - should disable button when loading state is true
 *   - should disable input fields when loading state is true
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from '../../../components/auth/LoginInput';

const mockLogin = vi.fn();

describe('LoginInput component', () => {
  it('should render LoginInput component correctly', () => {
    render(<LoginInput login={mockLogin} loading={false} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('should call login function with correct data when form is submitted', async () => {
    const user = userEvent.setup();
    render(<LoginInput login={mockLogin} loading={false} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should disable button when loading state is true', () => {
    render(<LoginInput login={mockLogin} loading={true} />);

    const loginButton = screen.getByRole('button', { name: /loading/i });

    expect(loginButton).toBeDisabled();
  });

  it('should disable input fields when loading state is true', () => {
    render(<LoginInput login={mockLogin} loading={true} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
  });
});
