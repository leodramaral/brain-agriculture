import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PropriedadeService } from './propriedade.service';
import { Propriedade } from '../entities/propriedade.entity';
import { Produtor } from '../entities/produtor.entity';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';

const mockPropriedadeRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

const mockProdutorRepository = {
  findOne: jest.fn(),
};

describe('PropriedadeService', () => {
  let service: PropriedadeService;
  let propriedadeRepository: Repository<Propriedade>;
  let produtorRepository: Repository<Produtor>;

  const mockProdutor = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    document: '123.456.789-01',
    name: 'João Silva',
    created_at: new Date(),
    updated_at: new Date(),
    propriedades: [],
  };

  const mockPropriedade = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Fazenda Boa Vista',
    city: 'Ribeirão Preto',
    state: 'SP',
    total_area_hectares: 1000.0,
    agricultural_area_hectares: 800.0,
    vegetation_area_hectares: 200.0,
    created_at: new Date(),
    updated_at: new Date(),
    produtor_id: '550e8400-e29b-41d4-a716-446655440000',
    produtor: mockProdutor,
    propriedade_cultura: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropriedadeService,
        {
          provide: getRepositoryToken(Propriedade),
          useValue: mockPropriedadeRepository,
        },
        {
          provide: getRepositoryToken(Produtor),
          useValue: mockProdutorRepository,
        },
      ],
    }).compile();

    service = module.get<PropriedadeService>(PropriedadeService);
    propriedadeRepository = module.get<Repository<Propriedade>>(getRepositoryToken(Propriedade));
    produtorRepository = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a propriedade successfully', async () => {
      const createPropriedadeDto: CreatePropriedadeDto = {
        produtor_id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Fazenda Boa Vista',
        city: 'Ribeirão Preto',
        state: 'SP',
        total_area_hectares: 1000.0,
        agricultural_area_hectares: 800.0,
        vegetation_area_hectares: 200.0,
      };

      mockProdutorRepository.findOne.mockResolvedValue(mockProdutor);
      mockPropriedadeRepository.create.mockReturnValue(mockPropriedade);
      mockPropriedadeRepository.save.mockResolvedValue(mockPropriedade);

      const result = await service.create(createPropriedadeDto);

      expect(produtorRepository.findOne).toHaveBeenCalledWith({
        where: { id: createPropriedadeDto.produtor_id },
      });
      expect(propriedadeRepository.create).toHaveBeenCalledWith(createPropriedadeDto);
      expect(propriedadeRepository.save).toHaveBeenCalledWith(mockPropriedade);
      expect(result).toEqual(mockPropriedade);
    });

    it('should throw NotFoundException when produtor does not exist', async () => {
      const createPropriedadeDto: CreatePropriedadeDto = {
        produtor_id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Fazenda Boa Vista',
        city: 'Ribeirão Preto',
        state: 'SP',
        total_area_hectares: 1000.0,
        agricultural_area_hectares: 800.0,
        vegetation_area_hectares: 200.0,
      };

      mockProdutorRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createPropriedadeDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(produtorRepository.findOne).toHaveBeenCalledWith({
        where: { id: createPropriedadeDto.produtor_id },
      });
      expect(propriedadeRepository.create).not.toHaveBeenCalled();
      expect(propriedadeRepository.save).not.toHaveBeenCalled();
    });

    it('should map DTO fields correctly to entity fields', async () => {
      const customDto: CreatePropriedadeDto = {
        produtor_id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Custom Farm',
        city: 'São Paulo',
        state: 'SP',
        total_area_hectares: 500.25,
        agricultural_area_hectares: 300.50,
        vegetation_area_hectares: 199.75,
      };

      mockProdutorRepository.findOne.mockResolvedValue(mockProdutor);
      mockPropriedadeRepository.create.mockReturnValue(mockPropriedade);
      mockPropriedadeRepository.save.mockResolvedValue(mockPropriedade);

      await service.create(customDto);

      expect(propriedadeRepository.create).toHaveBeenCalledWith(customDto);
    });
  });
});