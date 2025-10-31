import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PropriedadeService } from './propriedade.service';
import { Propriedade } from '../entities/propriedade.entity';
import { Produtor } from '../entities/produtor.entity';
import { PropriedadeCultura } from '../entities/propriedade-cultura.entity';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';

const mockPropriedadeRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

const mockProdutorRepository = {
  findOne: jest.fn(),
};

const mockPropriedadeCulturaRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('PropriedadeService', () => {
  let service: PropriedadeService;
  let propriedadeRepository: Repository<Propriedade>;
  let produtorRepository: Repository<Produtor>;
  let propriedadeCulturaRepository: Repository<PropriedadeCultura>;

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
        {
          provide: getRepositoryToken(PropriedadeCultura),
          useValue: mockPropriedadeCulturaRepository,
        },
      ],
    }).compile();

    service = module.get<PropriedadeService>(PropriedadeService);
    propriedadeRepository = module.get<Repository<Propriedade>>(getRepositoryToken(Propriedade));
    produtorRepository = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
    propriedadeCulturaRepository = module.get<Repository<PropriedadeCultura>>(getRepositoryToken(PropriedadeCultura));
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

  describe('addCulturas', () => {
    const mockCulturas = [
      {
        id: 'cultura-1',
        cultura: 'Soja',
        safra: 2024,
        planted_area_hectares: 150.5,
        propriedade_id: '123e4567-e89b-12d3-a456-426614174000',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'cultura-2',
        cultura: 'Milho',
        safra: 2024,
        planted_area_hectares: 200.0,
        propriedade_id: '123e4567-e89b-12d3-a456-426614174000',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const addCulturasDto = {
      culturas: [
        {
          name: 'Soja',
          safra: 2024,
          planted_area_hectares: 150.5,
        },
        {
          name: 'Milho',
          safra: 2024,
          planted_area_hectares: 200.0,
        },
      ],
    };

    it('should add culturas to propriedade successfully', async () => {
      mockPropriedadeRepository.findOne.mockResolvedValue(mockPropriedade);
      mockPropriedadeCulturaRepository.create.mockImplementation((data) => data);
      mockPropriedadeCulturaRepository.save.mockResolvedValue(mockCulturas);

      const result = await service.addCulturas(mockPropriedade.id, addCulturasDto);

      expect(propriedadeRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockPropriedade.id },
      });
      expect(propriedadeCulturaRepository.create).toHaveBeenCalledTimes(2);
      expect(propriedadeCulturaRepository.save).toHaveBeenCalledWith([
        {
          cultura: 'Soja',
          safra: 2024,
          planted_area_hectares: 150.5,
          propriedade_id: mockPropriedade.id,
        },
        {
          cultura: 'Milho',
          safra: 2024,
          planted_area_hectares: 200.0,
          propriedade_id: mockPropriedade.id,
        },
      ]);
      expect(result).toEqual([
        {
          id: 'cultura-1',
          name: 'Soja',
          safra: 2024,
          planted_area_hectares: 150.5,
          created_at: expect.any(Date),
          updated_at: expect.any(Date),
        },
        {
          id: 'cultura-2',
          name: 'Milho',
          safra: 2024,
          planted_area_hectares: 200.0,
          created_at: expect.any(Date),
          updated_at: expect.any(Date),
        },
      ]);
    });

    it('should throw NotFoundException when propriedade does not exist', async () => {
      mockPropriedadeRepository.findOne.mockResolvedValue(null);

      await expect(service.addCulturas('invalid-id', addCulturasDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(propriedadeRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'invalid-id' },
      });
      expect(propriedadeCulturaRepository.create).not.toHaveBeenCalled();
      expect(propriedadeCulturaRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('getCulturas', () => {
    const mockCulturas = [
      {
        id: 'cultura-1',
        cultura: 'Soja',
        safra: 2024,
        planted_area_hectares: 150.5,
        propriedade_id: '123e4567-e89b-12d3-a456-426614174000',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'cultura-2',
        cultura: 'Milho',
        safra: 2023,
        planted_area_hectares: 200.0,
        propriedade_id: '123e4567-e89b-12d3-a456-426614174000',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    it('should get culturas from propriedade successfully', async () => {
      mockPropriedadeRepository.findOne.mockResolvedValue(mockPropriedade);
      mockPropriedadeCulturaRepository.find.mockResolvedValue(mockCulturas);

      const result = await service.getCulturas(mockPropriedade.id);

      expect(propriedadeRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockPropriedade.id },
      });
      expect(propriedadeCulturaRepository.find).toHaveBeenCalledWith({
        where: { propriedade_id: mockPropriedade.id },
        order: { safra: 'DESC', cultura: 'ASC' },
      });
      expect(result).toEqual({
        propriedade_id: mockPropriedade.id,
        propriedade_name: mockPropriedade.name,
        culturas: [
          {
            id: 'cultura-1',
            name: 'Soja',
            safra: 2024,
            planted_area_hectares: 150.5,
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
          },
          {
            id: 'cultura-2',
            name: 'Milho',
            safra: 2023,
            planted_area_hectares: 200.0,
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
          },
        ],
      });
    });

    it('should throw NotFoundException when propriedade does not exist', async () => {
      mockPropriedadeRepository.findOne.mockResolvedValue(null);

      await expect(service.getCulturas('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(propriedadeRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'invalid-id' },
      });
      expect(propriedadeCulturaRepository.find).not.toHaveBeenCalled();
    });

    it('should return empty culturas array when propriedade has no culturas', async () => {
      mockPropriedadeRepository.findOne.mockResolvedValue(mockPropriedade);
      mockPropriedadeCulturaRepository.find.mockResolvedValue([]);

      const result = await service.getCulturas(mockPropriedade.id);

      expect(result).toEqual({
        propriedade_id: mockPropriedade.id,
        propriedade_name: mockPropriedade.name,
        culturas: [],
      });
    });
  });
});