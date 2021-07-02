import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Input from '@components/form/input';

describe('Input', () => {
  test('Handles text input', async () => {
    render(
      <Input
        name="Test"
        label="Text"
      />,
    );

    userEvent.type(screen.getByLabelText('Text'), 'Test Input');
    expect(screen.getByLabelText('Text')).toHaveValue('Test Input');
  });
});
