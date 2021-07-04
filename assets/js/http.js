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

async function safeParseJson(response) {
  try {
    const json = await response.clone().json();
    return json;
  } catch (e) {
    const text = await response.clone().text();
    return text;
  }
}

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

    const json = await safeParseJson(response);
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
