import type { ApiError } from '../categories/types';

export type Tag = {
  value: string;
  label: string;
  slug: string;
  __is_new__?: boolean;
};

export type TagState = {
  status: 'idle' | 'pending';
  data: Tag[];
  error: ApiError | null;
};
