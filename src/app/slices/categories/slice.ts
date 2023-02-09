import { createSlice } from '@reduxjs/toolkit';

import { getCategoriesAction } from './action';

import type { CategoryState } from './types';

const initialState = {
  loading: false,
  data: [],
  error: null,
} as CategoryState;

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(getCategoriesAction.rejected, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default categorySlice.reducer;
