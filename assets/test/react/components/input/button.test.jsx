import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '@components/form/button';

describe('Button', () => {
  test('is dark by default', async () => {
    render(
      <Button
        type="submit"
      >
        Test
      </Button>,
    );

    const expectedClasses = 'block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10';
    expect(screen.getByText('Test')).toHaveClass(expectedClasses);
  });

  test('is light when type changes', async () => {
    render(
      <Button
        type="submit"
        color="light"
      >
        Test
      </Button>,
    );

    const expectedClasses = 'bg-blue-50 px-2 py-1.5 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600';
    expect(screen.getByText('Test')).toHaveClass(expectedClasses);
  });
});
