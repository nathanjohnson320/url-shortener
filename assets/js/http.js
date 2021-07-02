/**
 * Generic HTTP client that attaches the right headers and cookies
 * automatically to requests so you don't have to worry about them.
 */

const csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute('content');

/**
 * The base path of our API
 */

const BASE = '/api';

/**
 * Helper function that builds URLs with our BASE
 */
const buildUrl = (uri) => `${BASE}/${uri}`;

const http = {
  async post(url, data, headers) {
    const response = await fetch(buildUrl(url), {
      method: 'POST',
      headers: {
        'x-csrf-token': csrfToken,
        'content-type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  },
};

export {
  http,
  BASE,
  buildUrl,
};
