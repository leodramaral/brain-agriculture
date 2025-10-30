import { baseApi } from './baseApi';
import type { Produtor } from '../../types';

const PRODUTORES_ENDPOINT = '/produtores';

export const produtorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProdutores: builder.query<Produtor[], void>({
      query: () => PRODUTORES_ENDPOINT,
      providesTags: ['Produtor'],
    }),
  }),
});

export const { useGetProdutoresQuery } = produtorApi;