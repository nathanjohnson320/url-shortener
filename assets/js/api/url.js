import { http, buildUrl } from '@http';

export const create = (params) => {
  const url = buildUrl('url');
  return http.post(url, params);
};

