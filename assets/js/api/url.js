import { http } from '@http';

export const create = (params) => (
  http.post('url', params)
);

export default {
  create,
};
