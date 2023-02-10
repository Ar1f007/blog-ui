import { createSlice } from '@reduxjs/toolkit';

import { getCategoriesAction } from './action';

import type { CategoryState } from './types';

const initialState = {
  loading: 'idle',
  data: [],
  error: null,
} as CategoryState;

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesAction.pending, (state) => {
      state.loading = 'pending';
    });

    builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(getCategoriesAction.rejected, (state, action) => {
      state.loading = 'idle';

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { clearCategoryError } = categorySlice.actions;

export default categorySlice.reducer;
