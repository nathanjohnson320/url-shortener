import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '@components/layout/header';

describe('Header', () => {
  test('renders without errors', async () => {
    render(<Header />);

    expect(screen.getAllByAltText('Workflow')).toHaveLength(2);
  });
});
