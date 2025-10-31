import { baseApi } from './baseApi';
import type { Produtor } from '../../types';

const PRODUTORES_ENDPOINT = '/produtores';

export interface CreateProdutorRequest {
  name: string;
  document: string;
}

export const produtorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProdutores: builder.query<Produtor[], void>({
      query: () => PRODUTORES_ENDPOINT,
      providesTags: ['Produtor'],
    }),
    createProdutor: builder.mutation<Produtor, CreateProdutorRequest>({
      query: data => ({
        url: PRODUTORES_ENDPOINT,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Produtor'],
    }),
  }),
});

export const { useGetProdutoresQuery, useCreateProdutorMutation } = produtorApi;
