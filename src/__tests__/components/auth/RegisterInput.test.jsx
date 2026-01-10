/**
 * - RegisterInput component spec
 *   - should render RegisterInput component correctly
 *   - should call register function with correct data when form is submitted
 *   - should disable button when loading state is true
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from '../../../components/auth/RegisterInput';

const mockRegister = vi.fn();

describe('RegisterInput component', () => {
  it('should render RegisterInput component correctly', () => {
    render(<RegisterInput register={mockRegister} loading={false} />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('should call register function with correct data when form is submitted', async () => {
    const user = userEvent.setup();
    render(<RegisterInput register={mockRegister} loading={false} />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should disable button when loading state is true', () => {
    render(<RegisterInput register={mockRegister} loading={true} />);

    const registerButton = screen.getByRole('button', { name: /loading/i });

    expect(registerButton).toBeDisabled();
  });
});
