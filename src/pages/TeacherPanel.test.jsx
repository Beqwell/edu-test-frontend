// Unit tests for TeacherPanel: course creation form rendering

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import TeacherPanel from './TeacherPanel';

describe('TeacherPanel', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TeacherPanel />
      </BrowserRouter>
    );
  });

  // Check if input field for course name is present
  it('renders Course name field', () => {
    expect(screen.getByPlaceholderText(/^Course name$/i)).toBeInTheDocument();
  });

  // Check if the Create button is present
  it('renders Create button', () => {
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
  });
});
