import Axios from 'axios';

/**
 * Generic HTTP client that attaches the right headers and cookies
 * automatically to requests so you don't have to worry about them.
 */

const http = Axios.create();

const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute('content');
http.defaults.headers.common['x-csrf-token'] = csrfToken;

/**
 * Use axios with swr and auto pass in the csrfToken header.
 * https://swr.vercel.app/docs/data-fetching#axios
 */
const fetcher = url => http.get(url).then(res => res.data);

/**
 * The base path of our API
 */

const BASE = '/api';

/**
 * Helper function that builds URLs with our BASE
 */
const buildUrl = (uri) => {
  return `${BASE}/${uri}`;
};

export {
  http,
  fetcher,
  BASE,
  buildUrl,
};
