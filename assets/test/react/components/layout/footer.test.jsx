import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '@components/layout/footer';

describe('Footer', () => {
  test('renders without errors', async () => {
    render(<Footer />);

    expect(screen.getByText('All rights reserved.', {
      exact: false,
    })).toBeInTheDocument();
  });
});
