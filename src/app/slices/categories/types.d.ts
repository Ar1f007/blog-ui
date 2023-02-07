export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export type CategoryState = {
  loading: boolean;
  data: Category[] | null;
  error: ApiError | null;
};
