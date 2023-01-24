import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import userApi from './services';

import type { RegisterPayload, User, UserState } from './types';
import type { LoginInputs } from '../../../features/authentication/validations/login';

// ------------------------------------------------------------------------------------------------
export const registerUserAction = createAsyncThunk<User, RegisterPayload, { rejectValue: UserState['error'] }>(
  'users/register',
  async (registerPayload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.register(registerPayload);
      return data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw error;
        }

        return rejectWithValue(error.response.data);
      }

      throw new Error('Something went wrong!');
    }
  },
);

// ------------------------------------------------------------------------------------------------
export const loginUserAction = createAsyncThunk<User, LoginInputs, { rejectValue: UserState['error'] }>(
  'users/login',
  async (loginPayload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.login(loginPayload);

      return data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw error;
        }

        return rejectWithValue(error.response.data);
      }

      throw new Error('Something went wrong!');
    }
  },
);
