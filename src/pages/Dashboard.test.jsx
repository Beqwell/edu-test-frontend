// Unit tests for Dashboard: join form rendering and button

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

// Mock localStorage
beforeAll(() => {
  localStorage.setItem('token', 'mock-token');
  localStorage.setItem('role', 'student');
});

// Mock Axios
vi.mock('../api/axios', () => ({
  default: {
    get: vi.fn((url) => {
      if (url === '/tests') return Promise.resolve({ data: [] });
      if (url === '/results') return Promise.resolve({ data: [] });
      return Promise.resolve({ data: [] });
    }),
  },
}));

describe('Dashboard', () => {
  it('renders Enter course join code field', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(await screen.findByPlaceholderText(/Enter course join code/i)).toBeInTheDocument();
  });

  it('renders Join Course button', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(await screen.findByRole('button', { name: /Join Course/i })).toBeInTheDocument();
  });
});
