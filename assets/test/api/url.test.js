import { create } from '@api/url';

beforeEach(() => {
  fetch.resetMocks();
});

describe('url', () => {
  test('posts url data with correct url', async () => {
    fetch.mockResponse(JSON.stringify({
      id: 1,
      shortUrl: 'wa',
      fullShortUrl: 'http://localhost:4002/wa',
      longUrl: 'https://www.test.com',
    }));

    const url = await create({
      longUrl: 'https://www.test.com',
    });

    expect(fetch).toHaveBeenCalledWith('/api/url', {
      body: '{"longUrl":"https://www.test.com"}',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': undefined,
      },
      method: 'POST',
    });
    expect(url).toEqual({
      id: 1,
      shortUrl: 'wa',
      fullShortUrl: 'http://localhost:4002/wa',
      longUrl: 'https://www.test.com',
    });
  });
});
