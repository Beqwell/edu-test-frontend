// Unit tests for the LoginPage: rendering form inputs and button

import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage', () => {
  // Check if username and password input fields appear
  it('renders username and password fields', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  // Check if the login button is rendered
  it('renders submit button', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
