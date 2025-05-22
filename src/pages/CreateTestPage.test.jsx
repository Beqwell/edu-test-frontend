// Unit tests for CreateTestPage: rendering input and submit button

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../test/test-utils';
import CreateTestPage from './CreateTestPage';

// Mock useParams and useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ courseId: '1' }),
    useNavigate: () => vi.fn(),
  };
});

describe('CreateTestPage', () => {
  it('renders Test title input', async () => {
    renderWithRouter(<CreateTestPage />);
    expect(await screen.findByPlaceholderText(/Test title/i)).toBeInTheDocument();
  });

  it('renders Create Test button', async () => {
    renderWithRouter(<CreateTestPage />);
    expect(await screen.findByRole('button', { name: /Create Test/i })).toBeInTheDocument();
  });
});
