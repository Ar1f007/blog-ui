import { createSlice } from '@reduxjs/toolkit';

import { loginUserAction, registerUserAction } from './action';

import type { UserState } from './types';
import type { RootState } from '../../store';

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

    logout: (state) => {
      state.data = null;
    },
    clearUserData: (state) => {
      state.data = null;
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

    // ------------------------------------------------------------------------------------------------

    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { clearError, logout } = usersSlice.actions;
export default usersSlice.reducer;

export const getUserData = (s: RootState) => s.user.data;
