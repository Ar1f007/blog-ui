import { createSlice } from '@reduxjs/toolkit';

import { getAllTagActions } from './action';

import type { TagState } from './types';

const initialState = {
  loading: false,
  data: [],
  error: null,
} as TagState;

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    clearTagError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTagActions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTagActions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(getAllTagActions.rejected, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { clearTagError } = tagSlice.actions;

export default tagSlice.reducer;
