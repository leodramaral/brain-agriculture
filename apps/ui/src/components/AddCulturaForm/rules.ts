import * as yup from 'yup';

export const schema = yup.object({
  cultura: yup
    .string()
    .required('Cultura é obrigatória')
    .min(1, 'Cultura deve ter pelo menos 1 caractere')
    .max(100, 'Cultura deve ter no máximo 100 caracteres'),
  safra: yup
    .number()
    .required('Safra é obrigatória')
    .integer('Safra deve ser um número inteiro')
    .min(1900, 'Safra deve ser maior que 1900')
    .max(2030, 'Safra deve ser menor que 2030'),
  planted_area_hectares: yup
    .number()
    .required('Área plantada é obrigatória')
    .positive('Área plantada deve ser maior que 0')
    .test(
      'decimal-places',
      'Área plantada deve ter no máximo 2 casas decimais',
      (value) => {
        if (value === undefined || value === null) return true;
        const str = value.toString();
        const decimalIndex = str.indexOf('.');
        if (decimalIndex === -1) return true;
        return str.substring(decimalIndex + 1).length <= 2;
      }
    ),
});
