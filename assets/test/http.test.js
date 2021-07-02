import { http } from '@http';

beforeEach(() => {
  fetch.resetMocks();
});

describe('http', () => {
  test('posts data with the correct url and params', async () => {
    fetch.mockResponse('{}');

    await http.post('url', {
      test: 'data',
    });

    expect(fetch).toHaveBeenCalledWith('/api/url', {
      body: '{"test":"data"}',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': undefined,
      },
      method: 'POST',
    });
  });
});
