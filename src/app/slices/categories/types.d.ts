import type { SerializedError } from '@reduxjs/toolkit';

export type Category = {
  value: string;
  label: string;
  slug: string;
  __is_new__?: boolean;
};

type ApiError = {
  success?: boolean;
} & SerializedError;

export type CategoryState = {
  loading: boolean;
  data: Category[];
  error: ApiError | null;
};
