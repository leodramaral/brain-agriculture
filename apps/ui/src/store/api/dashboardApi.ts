import type { DashboardStats } from '../../types';
import { baseApi } from './baseApi';

const DASHBOARD_ENDPOINT = '/dashboard';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => DASHBOARD_ENDPOINT + '/stats',
      providesTags: ['DashboardStats'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
