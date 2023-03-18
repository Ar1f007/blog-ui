import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../../constant';

export const postInfoApi = createApi({
  reducerPath: 'postInfoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPostInfo: builder.query({
      query: (slug: string) => ({
        url: `post/info/${slug}`,
      }),
    }),
  }),
});
