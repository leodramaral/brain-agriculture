import { baseApi } from './baseApi';
import type { Propriedade } from '../../types';

const PROPRIEDADES_ENDPOINT = '/propriedades';

export const propriedadesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPropriedades: builder.query<Propriedade[], void>({
      query: () => PROPRIEDADES_ENDPOINT,
      providesTags: ['Propriedade'],
    }),
  }),
});

export const { useGetPropriedadesQuery } = propriedadesApi;
