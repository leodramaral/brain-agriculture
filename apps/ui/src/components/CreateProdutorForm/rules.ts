import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  document: yup
    .string()
    .required('Documento é obrigatório')
    .test(
      'cpf-cnpj',
      'Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido',
      function (value) {
        if (!value) return false;

        const cleanDoc = value.replace(/[^\d]/g, '');

        // Verifica se é CPF (11 dígitos) ou CNPJ (14 dígitos)
        if (cleanDoc.length === 11) {
          return isValidCPF(cleanDoc);
        } else if (cleanDoc.length === 14) {
          return isValidCNPJ(cleanDoc);
        }

        return false;
      }
    ),
});

export const formatDocument = (value: string) => {
  const cleanValue = value.replace(/[^\d]/g, '');

  if (cleanValue.length <= 11) {
    // Formato CPF: 000.000.000-00
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  } else {
    // Formato CNPJ: 00.000.000/0000-00 (limita a 14 dígitos)
    const limitedValue = cleanValue.substring(0, 14);
    return limitedValue
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2');
  }
};

function isValidCPF(cpf: string): boolean {
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }

  let firstDigit = 11 - (sum % 11);
  if (firstDigit >= 10) firstDigit = 0;

  if (firstDigit !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }

  let secondDigit = 11 - (sum % 11);
  if (secondDigit >= 10) secondDigit = 0;

  return secondDigit === parseInt(cpf[10]);
}

function isValidCNPJ(cnpj: string): boolean {
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj[i]) * weights1[i];
  }

  let firstDigit = sum % 11;
  firstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;

  if (firstDigit !== parseInt(cnpj[12])) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj[i]) * weights2[i];
  }

  let secondDigit = sum % 11;
  secondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;

  return secondDigit === parseInt(cnpj[13]);
}
