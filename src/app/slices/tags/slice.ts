import { createSlice } from '@reduxjs/toolkit';

import { getAllTagActions } from './action';

import type { TagState } from './types';

const initialState = {
  status: 'idle',
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
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    });
    builder.addCase(getAllTagActions.fulfilled, (state, action) => {
      state.status = 'idle';
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(getAllTagActions.rejected, (state, action) => {
      state.status = 'idle';

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
