import React from 'react';
import {
  render, waitFor, screen,
} from '@test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Home from '@pages/home';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Home', () => {
  test('submits our form and displays info alert', async () => {
    fetch.mockResponse(JSON.stringify({
      id: 1,
      shortUrl: 'wa',
      fullShortUrl: 'http://localhost:4002/wa',
      longUrl: 'https://www.test.com',
    }));

    render(<Home />);

    userEvent.type(screen.getByLabelText('Long Url'), 'https://www.test.com');
    expect(screen.getByLabelText('Long Url')).toHaveValue('https://www.test.com');

    userEvent.click(screen.getByText('Shorten'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({
      longUrl: 'https://www.test.com',
    }));

    expect(screen.getByRole('alert'))
      .toHaveTextContent(
        'Shortened Successfully!Shortened URL: http://localhost:4002/waCopy to Clipboard',
      );
  });

  test('submits our form and displays error alert', async () => {
    const response = {
      errors: {
        longUrl: ['must start with http:// or https://'],
      },
    };

    fetch.mockResponses([
      JSON.stringify(response),
      { status: 422 },
    ]);

    render(<Home />);

    userEvent.type(screen.getByLabelText('Long Url'), 'asdf');
    expect(screen.getByLabelText('Long Url')).toHaveValue('asdf');

    userEvent.click(screen.getByText('Shorten'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByRole('alert'))
      .toHaveTextContent(
        'There was an error with your submissionLong Url: must start with http:// or https://',
      );
  });
});
