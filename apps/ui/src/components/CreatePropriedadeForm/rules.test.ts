import { schema, formatState, BRAZILIAN_STATES } from './rules';

describe('CreatePropriedadeForm Rules', () => {
  describe('schema validation', () => {
    const validData = {
      name: 'Fazenda São José',
      city: 'Ribeirão Preto',
      state: 'SP',
      total_area_hectares: 100.0,
      agricultural_area_hectares: 80.0,
      vegetation_area_hectares: 20.0,
    };

    it('should validate correct data', async () => {
      await expect(schema.validate(validData)).resolves.toEqual(validData);
    });

    describe('name validation', () => {
      it('should require name', async () => {
        const data = { ...validData, name: '' };
        await expect(schema.validate(data)).rejects.toThrow('Nome da propriedade é obrigatório');
      });

      it('should require minimum 2 characters for name', async () => {
        const data = { ...validData, name: 'A' };
        await expect(schema.validate(data)).rejects.toThrow('Nome deve ter pelo menos 2 caracteres');
      });

      it('should limit name to 100 characters', async () => {
        const data = { ...validData, name: 'A'.repeat(101) };
        await expect(schema.validate(data)).rejects.toThrow('Nome deve ter no máximo 100 caracteres');
      });
    });

    describe('city validation', () => {
      it('should require city', async () => {
        const data = { ...validData, city: '' };
        await expect(schema.validate(data)).rejects.toThrow('Cidade é obrigatória');
      });

      it('should require minimum 2 characters for city', async () => {
        const data = { ...validData, city: 'A' };
        await expect(schema.validate(data)).rejects.toThrow('Cidade deve ter pelo menos 2 caracteres');
      });
    });

    describe('state validation', () => {
      it('should require state', async () => {
        const data = { ...validData, state: '' };
        await expect(schema.validate(data)).rejects.toThrow('Estado é obrigatório');
      });

      it('should require exactly 2 characters for state', async () => {
        const data = { ...validData, state: 'S' };
        await expect(schema.validate(data)).rejects.toThrow('Estado deve ter 2 caracteres');
      });

      it('should require letters only', async () => {
        const data = { ...validData, state: 'S1' };
        await expect(schema.validate(data)).rejects.toThrow('Estado deve conter apenas letras');
      });
    });

    describe('area validation', () => {
      it('should require positive numbers for areas', async () => {
        const data = {
          ...validData,
          total_area_hectares: -10,
          agricultural_area_hectares: -5,
          vegetation_area_hectares: -5
        };
        await expect(schema.validate(data)).rejects.toThrow(/deve ser um número positivo/);
      });

      it('should reject when sum of areas exceeds total', async () => {
        const data = {
          ...validData,
          total_area_hectares: 100.0,
          agricultural_area_hectares: 60.0,
          vegetation_area_hectares: 50.0, // 60 + 50 = 110 > 100
        };
        await expect(schema.validate(data)).rejects.toThrow(
          'A soma da área agricultável e área de vegetação não pode ultrapassar a área total'
        );
      });

      it('should accept areas that sum exactly to total', async () => {
        const data = {
          ...validData,
          total_area_hectares: 90.0,
          agricultural_area_hectares: 60.0,
          vegetation_area_hectares: 30.0, // 60 + 30 = 90 ✓
        };
        await expect(schema.validate(data)).resolves.toEqual(data);
      });

      it('should accept areas that sum less than total (unused area)', async () => {
        const data = {
          ...validData,
          total_area_hectares: 100.0,
          agricultural_area_hectares: 50.0,
          vegetation_area_hectares: 30.0,
        };
        await expect(schema.validate(data)).resolves.toEqual(data);
      });

      it('should reject when sum slightly exceeds total', async () => {
        const data = {
          ...validData,
          total_area_hectares: 100.0,
          agricultural_area_hectares: 60.01,
          vegetation_area_hectares: 40.0,
        };
        await expect(schema.validate(data)).rejects.toThrow(
          'A soma da área agricultável e área de vegetação não pode ultrapassar a área total'
        );
      });
    });
  });

  describe('formatState', () => {
    it('should convert to uppercase', () => {
      expect(formatState('sp')).toBe('SP');
      expect(formatState('rj')).toBe('RJ');
      expect(formatState('mg')).toBe('MG');
    });

    it('should handle mixed case', () => {
      expect(formatState('Sp')).toBe('SP');
      expect(formatState('rJ')).toBe('RJ');
    });

    it('should preserve non-letters and invalid lengths (Yup validation will handle)', () => {
      expect(formatState('s1')).toBe('S1');
      expect(formatState('spa')).toBe('SPA');
      expect(formatState('')).toBe('');
    });
  });

  describe('BRAZILIAN_STATES', () => {
    it('should contain all 27 Brazilian states', () => {
      expect(BRAZILIAN_STATES).toHaveLength(27);
    });

    it('should contain common states', () => {
      expect(BRAZILIAN_STATES).toContain('SP');
      expect(BRAZILIAN_STATES).toContain('RJ');
      expect(BRAZILIAN_STATES).toContain('MG');
      expect(BRAZILIAN_STATES).toContain('RS');
    });
  });
});
