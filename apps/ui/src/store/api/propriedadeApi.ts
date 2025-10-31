import type { Cultura, Propriedade } from '../../types';
import { baseApi } from './baseApi';

export interface CreatePropriedadeRequest {
  name: string;
  city: string;
  state: string;
  total_area_hectares: number;
  agricultural_area_hectares: number;
  vegetation_area_hectares: number;
  produtor_id: string;
}

export interface AddCulturaToPropriedadeRequest {
    propriedade_id: string;
    cultura: string;
    safra: number;
    planted_area_hectares: number;
}

export const propriedadeAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPropriedade: builder.mutation<Propriedade, CreatePropriedadeRequest>({
            query: (data) => ({
                url: '/propriedades',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Propriedade'],
        }),
        addCulturaToPropriedade: builder.mutation<Cultura, AddCulturaToPropriedadeRequest>({
            query: (data) => {
                const { propriedade_id, cultura, safra, planted_area_hectares } = data;
                return {
                    url: `/propriedades/${propriedade_id}/culturas`,
                    method: 'POST',
                    body: {
                        culturas: [{
                            name: cultura,
                            safra,
                            planted_area_hectares
                        }]
                    },
                };
            },
            invalidatesTags: ['Propriedade'],
        }),
    }),
});

export const {
    useCreatePropriedadeMutation,
    useAddCulturaToPropriedadeMutation
} = propriedadeAPi;
