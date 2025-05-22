// Unit tests for CourseTestsPage: rendering tests list and create button

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../test/test-utils';
import CourseTestsPage from './CourseTestsPage';

// Mock useParams and useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ courseId: '1' }),
    useNavigate: () => vi.fn(),
  };
});

describe('CourseTestsPage', () => {
  it('renders Create New Test button', async () => {
    renderWithRouter(<CourseTestsPage />);
    expect(await screen.findByRole('button', { name: /Create New Test/i })).toBeInTheDocument();
  });

  it('renders fallback if no tests are available', async () => {
    renderWithRouter(<CourseTestsPage />);
    expect(await screen.findByText(/No tests available in this course/i)).toBeInTheDocument();
  });
});
