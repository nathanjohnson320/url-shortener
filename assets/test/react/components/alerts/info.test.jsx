import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InfoAlert from '@components/alerts/info';

describe('Info Alert', () => {
  test('renders info title', async () => {
    render(
      <InfoAlert title="Something cool">
        <p>Is here</p>
      </InfoAlert>,
    );

    expect(screen.getByRole('alert'))
      .toHaveTextContent('Something cool');
  });
});
