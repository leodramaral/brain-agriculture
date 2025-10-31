import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .required('Nome da propriedade é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  city: yup
    .string()
    .required('Cidade é obrigatória')
    .min(2, 'Cidade deve ter pelo menos 2 caracteres')
    .max(50, 'Cidade deve ter no máximo 50 caracteres'),
  state: yup
    .string()
    .required('Estado é obrigatório')
    .length(2, 'Estado deve ter 2 caracteres (ex: SP, RJ)')
    .matches(/^[A-Za-z]{2}$/, 'Estado deve conter apenas letras'),
  total_area_hectares: yup
    .number()
    .required('Área total é obrigatória')
    .positive('Área total deve ser um número positivo')
    .max(1000000, 'Área total deve ser menor que 1.000.000 hectares')
    .test(
      'decimal-precision',
      'Área total deve ter no máximo 2 casas decimais',
      function (value) {
        if (!value) return true;
        return Number(value.toFixed(2)) === value;
      }
    ),
  agricultural_area_hectares: yup
    .number()
    .required('Área agricultável é obrigatória')
    .positive('Área agricultável deve ser um número positivo')
    .max(1000000, 'Área agricultável deve ser menor que 1.000.000 hectares')
    .test(
      'decimal-precision',
      'Área agricultável deve ter no máximo 2 casas decimais',
      function (value) {
        if (!value) return true;
        return Number(value.toFixed(2)) === value;
      }
    ),
  vegetation_area_hectares: yup
    .number()
    .required('Área de vegetação é obrigatória')
    .positive('Área de vegetação deve ser um número positivo')
    .max(1000000, 'Área de vegetação deve ser menor que 1.000.000 hectares')
    .test(
      'decimal-precision',
      'Área de vegetação deve ter no máximo 2 casas decimais',
      function (value) {
        if (!value) return true;
        return Number(value.toFixed(2)) === value;
      }
    ),
}).test(
  'areas-sum',
  function (values) {
    console.log('entrou na soma', values);
    const { total_area_hectares, agricultural_area_hectares, vegetation_area_hectares } = values;

    if (!total_area_hectares || !agricultural_area_hectares || !vegetation_area_hectares) {
      return true;
    }

    const sum = agricultural_area_hectares + vegetation_area_hectares;

    if (sum > total_area_hectares) {
      return this.createError({
        path: 'total_area_hectares',
        message: 'A soma da área agricultável e área de vegetação não pode ultrapassar a área total'
      });
    }

    return true;
  }
);

export const formatState = (value: string): string => {
  return value.toUpperCase();
};

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

export type BrazilianState = typeof BRAZILIAN_STATES[number];
