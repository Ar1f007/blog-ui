import { createSlice } from '@reduxjs/toolkit';

import { registerUserAction } from './action';

import type { UserState } from './types';

const initialState = {
  loading: false,
  data: null,
  error: null,
} as UserState;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;
