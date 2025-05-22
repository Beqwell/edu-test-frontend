// Unit tests for CreateQuestionsPage: rendering question form

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../test/test-utils';
import CreateQuestionsPage from './CreateQuestionsPage';

// Mock useParams and useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ testId: '1' }),
    useNavigate: () => vi.fn(),
  };
});

describe('CreateQuestionsPage', () => {
  it('renders question textarea', async () => {
    renderWithRouter(<CreateQuestionsPage />);
    expect(await screen.findByPlaceholderText(/Question text/i)).toBeInTheDocument();
  });

  it('renders Save Question button', async () => {
    renderWithRouter(<CreateQuestionsPage />);
    expect(await screen.findByRole('button', { name: /Save Question/i })).toBeInTheDocument();
  });

  it('renders Publish Test button', async () => {
    renderWithRouter(<CreateQuestionsPage />);
    expect(await screen.findByRole('button', { name: /Publish Test/i })).toBeInTheDocument();
  });
});
