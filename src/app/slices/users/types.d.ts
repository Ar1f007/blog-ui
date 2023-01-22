import type { SignUpInputs } from '../../../features/authentication/validations/sign-up';
import type { SerializedError } from '@reduxjs/toolkit';

export type RegisterPayload = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type InputFieldNames = Exclude<keyof SignUpInputs, 'confirmPassword'>;

type ApiError = {
  success?: boolean;
  errors?: {
    fieldName: InputFieldNames;
    message: string;
  }[];
} & SerializedError;

export type UserState = {
  loading: boolean;
  data: User | null;
  error: ApiError | null;
};
