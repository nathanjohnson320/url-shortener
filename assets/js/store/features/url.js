import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { create } from '@api/url';

function persistUrls(urls) {
  window.localStorage.setItem('urls', JSON.stringify(urls));
}

function restoreUrls() {
  const urls = window.localStorage.getItem('urls');
  if (urls) {
    return JSON.parse(urls);
  }

  return [];
}

const initialState = {
  loading: false,
  urls: restoreUrls(),
  createdUrl: null,
  newUrl: {},
  errors: {},
};

export const urlsSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    setErrors(state, action) {
      state.createdUrl = null;
      state.errors = action.payload;
    },
    setUrl(state, action) {
      state.newUrl = action.payload;
    },
    receiveUrl(state, action) {
      state.newUrl = {};
      state.createdUrl = action.payload;
      state.urls.push(action.payload);
    },
    loading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setErrors, receiveUrl, setUrl, loading,
} = urlsSlice.actions;

export const createUrl = createAsyncThunk(
  'url',
  async (form, { dispatch, getState }) => {
    try {
      // Clear existing data and errors before submit
      dispatch(loading(true));
      dispatch(setErrors({}));
      const url = await create(form);

      // Clear the form after submit
      dispatch(setUrl({}));
      dispatch(receiveUrl(url));

      persistUrls(getState().urls.urls);

      return url;
    } catch (err) {
      return dispatch(setErrors(err.errors || err));
    } finally {
      dispatch(loading(false));
    }
  },
);

export default urlsSlice.reducer;
