import { configureStore } from '@reduxjs/toolkit';

import urls from './features/url';

export default configureStore({
  reducer: {
    urls,
  },
});
