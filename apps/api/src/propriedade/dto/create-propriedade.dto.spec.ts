import { validate } from 'class-validator';
import { CreatePropriedadeDto } from './create-propriedade.dto';

describe('CreatePropriedadeDto', () => {
  const createValidDto = () => {
    const dto = new CreatePropriedadeDto();
    dto.produtor_id = '550e8400-e29b-41d4-a716-446655440000';
    dto.name = 'Fazenda Boa Vista';
    dto.city = 'Ribeirão Preto';
    dto.state = 'SP';
    dto.total_farm_area_hectares = 1000.0;
    dto.arable_area_hectares = 800.0;
    dto.vegetation_area_hectares = 200.0;
    return dto;
  };

  const expectValidationError = async (dto: CreatePropriedadeDto, propertyName: string, shouldHaveError = true) => {
    const errors = await validate(dto);
    const propertyErrors = errors.filter(error => error.property === propertyName);
    
    if (shouldHaveError) {
      expect(propertyErrors.length).toBeGreaterThan(0);
    } else {
      expect(propertyErrors).toHaveLength(0);
    }
    
    return propertyErrors;
  };

  describe('produtor_id validation', () => {
    test.each([
      ['accept valid UUID v4', '550e8400-e29b-41d4-a716-446655440000', false],
      ['accept another valid UUID v4', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', false],
      ['reject invalid UUID format', 'invalid-uuid', true],
      ['reject empty string', '', true],
      ['reject partial UUID', '550e8400-e29b', true],
    ])('should %s: %s', async (_, value, shouldFail) => {
      const dto = createValidDto();
      dto.produtor_id = value;
      
      const errors = await expectValidationError(dto, 'produtor_id', shouldFail);
      
      if (shouldFail && value === 'invalid-uuid') {
        expect(errors[0].constraints).toHaveProperty('isUuid');
      }
    });
  });

  describe('name validation', () => {
    test.each([
      ['accept valid name', 'Fazenda Boa Vista', false],
      ['accept name with special characters', 'Fazenda São José - Unidade 1', false],
      ['accept minimum length name', 'A', false],
      ['reject empty name', '', true],
      ['reject name that is too long', 'a'.repeat(256), true],
    ])('should %s', async (_, value, shouldFail) => {
      const dto = createValidDto();
      dto.name = value;
      
      await expectValidationError(dto, 'name', shouldFail);
    });
  });

  describe('city validation', () => {
    test.each([
      ['accept valid city', 'Ribeirão Preto', false],
      ['accept city with accents', 'São José dos Campos', false],
      ['accept minimum length city', 'A', false],
      ['reject empty city', '', true],
      ['reject city that is too long', 'a'.repeat(101), true],
    ])('should %s', async (_, value, shouldFail) => {
      const dto = createValidDto();
      dto.city = value;
      
      await expectValidationError(dto, 'city', shouldFail);
    });
  });

  describe('state validation', () => {
    test.each([
      ['accept valid state code SP', 'SP', false],
      ['accept valid state code RJ', 'RJ', false],
      ['accept valid state code MG', 'MG', false],
      ['reject empty state', '', true],
      ['reject state with one character', 'S', true],
      ['reject state with three characters', 'SAO', true],
      ['reject state with four characters', 'SPAL', true],
    ])('should %s', async (_, value, shouldFail) => {
      const dto = createValidDto();
      dto.state = value;
      
      await expectValidationError(dto, 'state', shouldFail);
    });
  });

  describe('total_farm_area_hectares validation', () => {
    test.each([
      ['accept valid positive number', 1000.5, false],
      ['accept number with 2 decimal places', 999.99, false],
      ['accept minimum positive value', 0.01, false],
      ['accept large number', 50000.50, false],
      ['reject negative number', -100, true],
      ['reject zero', 0, true],
      ['reject number with more than 2 decimal places', 100.123, true],
    ])('should %s', async (_, value, shouldFail) => {
      const dto = createValidDto();
      dto.total_farm_area_hectares = value;
      
      await expectValidationError(dto, 'total_farm_area_hectares', shouldFail);
    });
  });

  describe('arable_area_hectares validation', () => {
    test.each([
      ['accept valid positive number', 800.5, false],
      ['accept zero', 0, false],
      ['accept number with 2 decimal places', 999.99, false],
      ['reject negative number', -50, true],
      ['reject number with more than 2 decimal places', 800.123, true],
    ])('should %s', async (_, value, shouldFail) => {
      const dto = createValidDto();
      dto.arable_area_hectares = value;
      
      await expectValidationError(dto, 'arable_area_hectares', shouldFail);
    });
  });

  describe('vegetation_area_hectares validation', () => {
    test.each([
      ['accept valid positive number within limit', 150.75, false],
      ['accept zero', 0, false],
      ['reject negative number', -25, true],
      ['reject number with more than 2 decimal places', 200.456, true],
    ])('should %s', async (_, value, shouldFail) => {
      const dto = createValidDto();
      dto.vegetation_area_hectares = value;
      
      await expectValidationError(dto, 'vegetation_area_hectares', shouldFail);
    });
  });

  describe('business logic validation', () => {
    test.each([
      ['pass when areas equal total', 1000, 800, 200, false],
      ['pass when areas are less than total', 1000, 700, 200, false],
      ['pass with minimal valid areas', 0.1, 0.05, 0.05, false],
      ['pass when only arable area is used', 1000, 1000, 0, false],
      ['pass when only vegetation area is used', 1000, 0, 1000, false],
      ['reject when areas exceed total', 1000, 800, 300, true],
      ['reject when only arable exceeds total', 1000, 1200, 0, true],
      ['reject when only vegetation exceeds total', 1000, 0, 1200, true],
    ])('should %s', async (_, totalArea, arableArea, vegetationArea, shouldFail) => {
      const dto = createValidDto();
      dto.total_farm_area_hectares = totalArea;
      dto.arable_area_hectares = arableArea;
      dto.vegetation_area_hectares = vegetationArea;

      if (shouldFail) {
        const errors = await expectValidationError(dto, 'vegetation_area_hectares', true);
        expect(errors[0].constraints).toHaveProperty('areaSumConstraint');
        expect(errors[0].constraints.areaSumConstraint).toContain('cannot exceed the total farm area');
      } else {
        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
      }
    });

    it('should not apply area sum validation when required fields are missing', async () => {
      const dto = new CreatePropriedadeDto();
      dto.produtor_id = '550e8400-e29b-41d4-a716-446655440000';
      dto.name = 'Test Farm';
      dto.city = 'Test City';
      dto.state = 'SP';

      const errors = await validate(dto);
      const areaSumErrors = errors.filter(error => 
        error.constraints && error.constraints.areaSumConstraint
      );
      
      expect(areaSumErrors).toHaveLength(0);
      
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});