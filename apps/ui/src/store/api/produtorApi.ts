import { baseApi } from './baseApi';
import type { Produtor, Propriedade } from '../../types';

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
    getProdutorById: builder.query<Produtor, string>({
      query: (id) => `${PRODUTORES_ENDPOINT}/${id}`,
      providesTags: ['Produtor'],
    }),
    getPropriedadesByProdutorId: builder.query<Propriedade[], string>({
      query: (produtorId) => `${PRODUTORES_ENDPOINT}/${produtorId}/propriedades`,
      providesTags: ['Propriedade'],
    })
  }),
});

export const { useGetProdutoresQuery, useCreateProdutorMutation, useGetProdutorByIdQuery, useGetPropriedadesByProdutorIdQuery } = produtorApi;
