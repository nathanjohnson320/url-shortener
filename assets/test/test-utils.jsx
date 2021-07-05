// Need a custom render so tests have a store
// https://testing-library.com/docs/react-testing-library/setup/
import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import urls from '@features/url';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { urls }, preloadedState }),
    ...renderOptions
  } = {}
) {
  /* eslint-disable react/prop-types */
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
