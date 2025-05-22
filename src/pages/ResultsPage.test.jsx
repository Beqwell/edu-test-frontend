// Unit tests for ResultsPage: table header rendering

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../test/test-utils';
import ResultsPage from './ResultsPage';

// Mock useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ testId: '1' }),
  };
});

describe('ResultsPage', () => {
  it('renders table header if results exist or fallback', async () => {
    renderWithRouter(<ResultsPage />);
    expect(await screen.findByText(/Test Results/i)).toBeInTheDocument();
  });
});
