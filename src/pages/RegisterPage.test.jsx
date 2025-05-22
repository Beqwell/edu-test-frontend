// Unit tests for RegisterPage: form input rendering

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
  });

  // Checks if the username input is rendered
  it('renders username field', () => {
    expect(screen.getByPlaceholderText(/^username$/i)).toBeInTheDocument();
  });

  // Checks if the password input is rendered
  it('renders password field', () => {
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
  });

  // Checks if the Register button is rendered
  it('renders Register button', () => {
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });
});
