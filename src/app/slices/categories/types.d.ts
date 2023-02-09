export type Category = {
  value: string;
  label: string;
  slug: string;
  __is_new__?: boolean;
};

export type CategoryState = {
  loading: boolean;
  data: Category[];
  error: ApiError | null;
};
