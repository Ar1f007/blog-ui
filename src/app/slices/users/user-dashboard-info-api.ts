import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../../constant';

import type { DashboardInfoRes } from './types';

export const dashboardInfoApi = createApi({
  reducerPath: 'userDashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getDashboardInfo: builder.query<DashboardInfoRes, string>({
      query: (userId) => `/users/dashboard-info/${userId}`,
    }),
  }),
});

export const { useGetDashboardInfoQuery } = dashboardInfoApi;
