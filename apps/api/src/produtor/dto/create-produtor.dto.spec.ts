import { validate } from 'class-validator';
import { CreateProdutorDto } from './create-produtor.dto';

describe('CreateProdutorDto', () => {
  describe('document validation', () => {
    it('should accept valid CPF format', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '123.456.789-10';
      dto.name = 'João Silva';

      const errors = await validate(dto);
      const documentErrors = errors.filter(error => error.property === 'document');
      
      expect(documentErrors).toHaveLength(0);
    });

    it('should accept valid CNPJ format', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '12.345.678/0001-90';
      dto.name = 'João Silva LTDA';

      const errors = await validate(dto);
      const documentErrors = errors.filter(error => error.property === 'document');
      
      expect(documentErrors).toHaveLength(0);
    });

    it('should reject invalid CPF format', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '123.456.789-XX';
      dto.name = 'João Silva';

      const errors = await validate(dto);
      const documentErrors = errors.filter(error => error.property === 'document');
      
      expect(documentErrors).toHaveLength(1);
      expect(documentErrors[0].constraints).toHaveProperty('matches');
      expect(documentErrors[0].constraints.matches).toContain('Document must be a valid CPF');
    });

    it('should reject invalid CNPJ format', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '12.345.678/0001-XX';
      dto.name = 'João Silva LTDA';

      const errors = await validate(dto);
      const documentErrors = errors.filter(error => error.property === 'document');
      
      expect(documentErrors).toHaveLength(1);
      expect(documentErrors[0].constraints).toHaveProperty('matches');
    });

    it('should reject document with wrong length', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '123.456';
      dto.name = 'João Silva';

      const errors = await validate(dto);
      const documentErrors = errors.filter(error => error.property === 'document');
      
      expect(documentErrors.length).toBeGreaterThan(0);
    });

    it('should reject empty document', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '';
      dto.name = 'João Silva';

      const errors = await validate(dto);
      const documentErrors = errors.filter(error => error.property === 'document');
      
      expect(documentErrors.length).toBeGreaterThan(0);
    });

    it('should reject document without proper format', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '12345678910';
      dto.name = 'João Silva';

      const errors = await validate(dto);
      const documentErrors = errors.filter(error => error.property === 'document');
      
      expect(documentErrors.length).toBeGreaterThan(0);
    });
  });

  describe('name validation', () => {
    it('should accept valid name', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '123.456.789-10';
      dto.name = 'João Silva';

      const errors = await validate(dto);
      const nameErrors = errors.filter(error => error.property === 'name');
      
      expect(nameErrors).toHaveLength(0);
    });

    it('should reject empty name', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '123.456.789-10';
      dto.name = '';

      const errors = await validate(dto);
      const nameErrors = errors.filter(error => error.property === 'name');
      
      expect(nameErrors.length).toBeGreaterThan(0);
    });

    it('should reject name that is too long', async () => {
      const dto = new CreateProdutorDto();
      dto.document = '123.456.789-10';
      dto.name = 'a'.repeat(256);

      const errors = await validate(dto);
      const nameErrors = errors.filter(error => error.property === 'name');
      
      expect(nameErrors.length).toBeGreaterThan(0);
    });
  });
});