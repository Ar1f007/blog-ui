import { createSlice } from '@reduxjs/toolkit';

import { registerUserAction } from './action';

import type { UserState } from './types';
// import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      // console.log('success', action);
      state.loading = false;
      state.data = action.payload.user;
      state.error = null;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error.message || 'something went wrong';
      }
    });
  },
});

export default usersSlice.reducer;
