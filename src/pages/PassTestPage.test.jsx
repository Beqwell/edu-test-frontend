// Unit tests for PassTestPage: loading and render

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../test/test-utils';
import PassTestPage from './PassTestPage';

// Mock useParams and useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
  };
});

describe('PassTestPage', () => {
  it('renders Loading test text', async () => {
    renderWithRouter(<PassTestPage />);
    expect(await screen.findByText(/Loading test/i)).toBeInTheDocument();
  });
});
