// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import '../css/app.css';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import 'phoenix_html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './react/app';

/* eslint react/jsx-filename-extension: 0 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'),
);
