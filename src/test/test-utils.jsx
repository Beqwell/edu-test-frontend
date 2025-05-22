import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Reusable render with router context
export function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

// Setup fake localStorage before all tests
beforeAll(() => {
  localStorage.setItem('token', 'mock-token');
  localStorage.setItem('role', 'student'); // or 'teacher'
});

// Full axios mock including interceptors and axios.create
vi.mock('axios', async () => {
  const actualAxios = await vi.importActual('axios');

  return {
    ...actualAxios,
    create: () => ({
      get: vi.fn((url) => {
        if (url.includes('/tests')) return Promise.resolve({ data: [] });
        if (url.includes('/results')) return Promise.resolve({ data: [] });
        if (url.includes('/courses')) return Promise.resolve({ data: [] });
        return Promise.resolve({ data: {} });
      }),
      post: vi.fn(() => Promise.resolve({ data: {} })),
      delete: vi.fn(() => Promise.resolve({ data: {} })),
      interceptors: {
        request: {
          use: vi.fn(), // fake .use to prevent crash
        },
      },
    }),
  };
});
