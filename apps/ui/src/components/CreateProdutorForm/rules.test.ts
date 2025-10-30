import { formatDocument, schema } from './rules';

describe('rules.ts', () => {
  describe('formatDocument', () => {
    describe('CPF formatting', () => {
      it('should format CPF correctly for partial input', () => {
        expect(formatDocument('123')).toBe('123');
        expect(formatDocument('12345')).toBe('123.45');  
        expect(formatDocument('123456789')).toBe('123.456.789');
        expect(formatDocument('12345678901')).toBe('123.456.789-01');
      });

      it('should format complete CPF', () => {
        expect(formatDocument('12345678901')).toBe('123.456.789-01');
      });

      it('should handle already formatted CPF', () => {
        expect(formatDocument('123.456.789-01')).toBe('123.456.789-01');
      });

      it('should remove non-numeric characters', () => {
        expect(formatDocument('123abc456def789ghi01')).toBe('123.456.789-01');
      });
    });

    describe('CNPJ formatting', () => {
      it('should format CNPJ correctly for partial input', () => {
        expect(formatDocument('123456789012')).toBe('12.345.678/9012');
        expect(formatDocument('12345678901234')).toBe('12.345.678/9012-34');
      });

      it('should format complete CNPJ', () => {
        expect(formatDocument('12345678901234')).toBe('12.345.678/9012-34');
      });

      it('should handle already formatted CNPJ', () => {
        expect(formatDocument('12.345.678/9012-34')).toBe('12.345.678/9012-34');
      });

      it('should remove non-numeric characters from CNPJ', () => {
        expect(formatDocument('12abc345def678ghi901jkl234')).toBe('12.345.678/9012-34');
      });
    });

    describe('edge cases', () => {
      it('should handle empty string', () => {
        expect(formatDocument('')).toBe('');
      });

      it('should handle single digit', () => {
        expect(formatDocument('1')).toBe('1');
      });

      it('should handle very long input', () => {
        expect(formatDocument('123456789012345678901234')).toBe('12.345.678/9012-34');
      });
    });
  });

  describe('schema validation', () => {
    describe('name validation', () => {
      it('should validate correct names', async () => {
        const validData = { name: 'João Silva', document: '123.456.789-09' };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should reject empty name', async () => {
        const invalidData = { name: '', document: '123.456.789-09' };
        await expect(schema.validate(invalidData)).rejects.toThrow('Nome é obrigatório');
      });

      it('should reject name with less than 2 characters', async () => {
        const invalidData = { name: 'A', document: '123.456.789-09' };
        await expect(schema.validate(invalidData)).rejects.toThrow('Nome deve ter pelo menos 2 caracteres');
      });

      it('should reject name with more than 100 characters', async () => {
        const longName = 'A'.repeat(101);
        const invalidData = { name: longName, document: '123.456.789-09' };
        await expect(schema.validate(invalidData)).rejects.toThrow('Nome deve ter no máximo 100 caracteres');
      });

      it('should accept name with exactly 2 characters', async () => {
        const validData = { name: 'Al', document: '123.456.789-09' };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should accept name with exactly 100 characters', async () => {
        const validName = 'A'.repeat(100);
        const validData = { name: validName, document: '123.456.789-09' };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });
    });

    describe('document validation', () => {
      it('should reject empty document', async () => {
        const invalidData = { name: 'João Silva', document: '' };
        await expect(schema.validate(invalidData)).rejects.toThrow('Documento é obrigatório');
      });

      it('should reject invalid document length', async () => {
        const invalidData = { name: 'João Silva', document: '123456' };
        await expect(schema.validate(invalidData)).rejects.toThrow('Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido');
      });

      describe('CPF validation', () => {
        it('should accept valid CPF', async () => {
          // CPF válido: 123.456.789-09
          const validData = { name: 'João Silva', document: '12345678909' };
          await expect(schema.validate(validData)).resolves.toEqual(validData);
        });

        it('should accept formatted valid CPF', async () => {
          const validData = { name: 'João Silva', document: '123.456.789-09' };
          await expect(schema.validate(validData)).resolves.toEqual(validData);
        });

        it('should reject invalid CPF', async () => {
          const invalidData = { name: 'João Silva', document: '12345678901' };
          await expect(schema.validate(invalidData)).rejects.toThrow('Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido');
        });

        it('should reject CPF with all same digits', async () => {
          const invalidData = { name: 'João Silva', document: '11111111111' };
          await expect(schema.validate(invalidData)).rejects.toThrow('Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido');
        });

        it('should reject formatted invalid CPF', async () => {
          const invalidData = { name: 'João Silva', document: '123.456.789-01' };
          await expect(schema.validate(invalidData)).rejects.toThrow('Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido');
        });
      });

      describe('CNPJ validation', () => {
        it('should accept valid CNPJ', async () => {
          // CNPJ válido: 11.222.333/0001-81
          const validData = { name: 'Empresa LTDA', document: '11222333000181' };
          await expect(schema.validate(validData)).resolves.toEqual(validData);
        });

        it('should accept formatted valid CNPJ', async () => {
          const validData = { name: 'Empresa LTDA', document: '11.222.333/0001-81' };
          await expect(schema.validate(validData)).resolves.toEqual(validData);
        });

        it('should reject invalid CNPJ', async () => {
          const invalidData = { name: 'Empresa LTDA', document: '12345678901234' };
          await expect(schema.validate(invalidData)).rejects.toThrow('Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido');
        });

        it('should reject formatted invalid CNPJ', async () => {
          const invalidData = { name: 'Empresa LTDA', document: '12.345.678/9012-34' };
          await expect(schema.validate(invalidData)).rejects.toThrow('Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido');
        });
      });
    });

    describe('complete form validation', () => {
      it('should validate complete valid form with CPF', async () => {
        const validData = { name: 'João Silva', document: '123.456.789-09' };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should validate complete valid form with CNPJ', async () => {
        const validData = { name: 'Empresa LTDA', document: '11.222.333/0001-81' };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should reject form with both invalid name and document', async () => {
        const invalidData = { name: 'A', document: '123' };
        await expect(schema.validate(invalidData)).rejects.toThrow();
      });
    });
  });
});