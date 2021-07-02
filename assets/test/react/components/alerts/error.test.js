import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorAlert from '@components/alerts/error';

describe('Error Alert', () => {
  test('renders nothing when there are no errors', async () => {
    render(<ErrorAlert />);

    expect(screen.queryByText('There was an error with your submission')).toBeNull();
  });

  test('renders singular language when only one error', async () => {
    const errors = {
      full_url: 'Must be here',
    };

    render(<ErrorAlert errors={errors} />);
    expect(screen.getByText('There was an error with your submission')).toBeInTheDocument();
    expect(screen.getByText('Full Url: Must be here')).toBeInTheDocument();
  });

  test('renders singular language when error name is passed', async () => {
    const errors = {
      full_url: 'Must be here',
      short_url: 'has some problems',
    };
    render(<ErrorAlert errors={errors} name="full_url" />);
    expect(screen.getByText('There was an error with your submission')).toBeInTheDocument();
    expect(screen.getByText('Must be here')).toBeInTheDocument();
  });

  test('renders plural language when no name and multiple errors', async () => {
    const errors = {
      full_url: 'Must be here',
      short_url: 'has some problems',
    };

    render(<ErrorAlert errors={errors} />);
    expect(screen.getByText('There were 2 errors with your submission')).toBeInTheDocument();
    expect(screen.getByText('Full Url: Must be here')).toBeInTheDocument();
    expect(screen.getByText('Short Url: has some problems')).toBeInTheDocument();
  });
});
