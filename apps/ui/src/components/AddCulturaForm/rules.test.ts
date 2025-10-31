import { schema } from './rules';

describe('AddCulturaForm rules', () => {

  describe('schema validation', () => {
    describe('cultura validation', () => {
      it('should validate correct cultura names', async () => {
        const validData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should reject empty cultura', async () => {
        const invalidData = { cultura: '', safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(invalidData)).rejects.toThrow('Cultura é obrigatória');
      });

      it('should reject cultura with more than 100 characters', async () => {
        const longCultura = 'A'.repeat(101);
        const invalidData = { cultura: longCultura, safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(invalidData)).rejects.toThrow(
          'Cultura deve ter no máximo 100 caracteres'
        );
      });

      it('should accept cultura with exactly 100 characters', async () => {
        const maxCultura = 'A'.repeat(100);
        const validData = { cultura: maxCultura, safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should accept single character cultura', async () => {
        const validData = { cultura: 'M', safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });
    });

    describe('safra validation', () => {
      it('should validate correct safra years', async () => {
        const validData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should reject safra before 1900', async () => {
        const invalidData = { cultura: 'Soja', safra: 1899, planted_area_hectares: 100.5 };
        await expect(schema.validate(invalidData)).rejects.toThrow('Safra deve ser maior que 1900');
      });

      it('should reject safra after 2030', async () => {
        const invalidData = { cultura: 'Soja', safra: 2031, planted_area_hectares: 100.5 };
        await expect(schema.validate(invalidData)).rejects.toThrow('Safra deve ser menor que 2030');
      });

      it('should accept safra exactly at limits', async () => {
        const validData1900 = { cultura: 'Soja', safra: 1900, planted_area_hectares: 100.5 };
        const validData2030 = { cultura: 'Soja', safra: 2030, planted_area_hectares: 100.5 };

        await expect(schema.validate(validData1900)).resolves.toEqual(validData1900);
        await expect(schema.validate(validData2030)).resolves.toEqual(validData2030);
      });

      it('should reject non-integer safra', async () => {
        const invalidData = { cultura: 'Soja', safra: 2024.5, planted_area_hectares: 100.5 };
        await expect(schema.validate(invalidData)).rejects.toThrow('Safra deve ser um número inteiro');
      });

      it('should reject empty safra', async () => {
        const invalidData = { cultura: 'Soja', planted_area_hectares: 100.5 };
        await expect(schema.validate(invalidData)).rejects.toThrow('Safra é obrigatória');
      });
    });

    describe('planted_area_hectares validation', () => {
      it('should validate correct area values', async () => {
        const validData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should reject zero area', async () => {
        const invalidData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 0 };
        await expect(schema.validate(invalidData)).rejects.toThrow('Área plantada deve ser maior que 0');
      });

      it('should reject negative area', async () => {
        const invalidData = { cultura: 'Soja', safra: 2024, planted_area_hectares: -10 };
        await expect(schema.validate(invalidData)).rejects.toThrow('Área plantada deve ser maior que 0');
      });

      it('should accept integer area values', async () => {
        const validData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 100 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should accept area with 1 decimal place', async () => {
        const validData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should accept area with 2 decimal places', async () => {
        const validData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 100.25 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should reject area with more than 2 decimal places', async () => {
        const invalidData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 100.255 };
        await expect(schema.validate(invalidData)).rejects.toThrow(
          'Área plantada deve ter no máximo 2 casas decimais'
        );
      });

      it('should accept very small area values', async () => {
        const validData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 0.01 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should reject empty area', async () => {
        const invalidData = { cultura: 'Soja', safra: 2024 };
        await expect(schema.validate(invalidData)).rejects.toThrow('Área plantada é obrigatória');
      });
    });

    describe('complete form validation', () => {
      it('should validate complete valid form', async () => {
        const validData = { cultura: 'Soja', safra: 2024, planted_area_hectares: 100.5 };
        await expect(schema.validate(validData)).resolves.toEqual(validData);
      });

      it('should validate with different cultura types', async () => {
        const culturas = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana-de-açúcar'];

        for (const cultura of culturas) {
          const validData = { cultura, safra: 2024, planted_area_hectares: 50.25 };
          await expect(schema.validate(validData)).resolves.toEqual(validData);
        }
      });

      it('should reject form with multiple invalid fields', async () => {
        const invalidData = { cultura: '', safra: 1800, planted_area_hectares: -10 };
        await expect(schema.validate(invalidData)).rejects.toThrow();
      });

      it('should validate edge case values', async () => {
        const edgeCaseData = { cultura: 'M', safra: 1900, planted_area_hectares: 0.01 };
        await expect(schema.validate(edgeCaseData)).resolves.toEqual(edgeCaseData);
      });
    });
  });
});
