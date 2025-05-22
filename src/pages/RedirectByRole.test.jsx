// Unit test for RedirectByRole: shows login if no token

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../test/test-utils';
import RedirectByRole from './RedirectByRole';

describe('RedirectByRole', () => {
  it('renders login page if no token is set', async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    renderWithRouter(<RedirectByRole />);

    // More specific: check login heading
    expect(await screen.findByRole('heading', { name: /login/i })).toBeInTheDocument();

    // Optional: also check the button
    expect(await screen.findByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
