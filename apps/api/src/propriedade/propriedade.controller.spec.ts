import { Test } from '@nestjs/testing';
import { PropriedadeController } from './propriedade.controller';
import { PropriedadeService } from './propriedade.service';
import { NotFoundException } from '@nestjs/common';

describe('PropriedadeController', () => {
  let controller;
  let service;

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
    produtor: null,
    propriedade_cultura: [],
  };

  const mockPropriedadeService = {
    create: jest.fn().mockResolvedValue(mockPropriedade),
    addCulturas: jest.fn(),
    getCulturas: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PropriedadeController],
      providers: [
        {
          provide: PropriedadeService,
          useValue: mockPropriedadeService,
        },
      ],
    }).compile();

    controller = module.get(PropriedadeController);
    service = module.get(PropriedadeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new propriedade', async () => {
      const createPropriedadeDto = {
        produtor_id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Fazenda Boa Vista',
        city: 'Ribeirão Preto',
        state: 'SP',
        total_area_hectares: 1000.0,
        agricultural_area_hectares: 800.0,
        vegetation_area_hectares: 200.0,
      };

      const result = await controller.create(createPropriedadeDto);

      expect(service.create).toHaveBeenCalledWith(createPropriedadeDto);
      expect(result).toEqual(mockPropriedade);
    });

    it('should handle service errors when creating propriedade', async () => {
      const createPropriedadeDto = {
        produtor_id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Fazenda Boa Vista',
        city: 'Ribeirão Preto',
        state: 'SP',
        total_area_hectares: 1000.0,
        agricultural_area_hectares: 800.0,
        vegetation_area_hectares: 200.0,
      };

      service.create.mockRejectedValue(new NotFoundException('Produtor not found'));

      await expect(controller.create(createPropriedadeDto)).rejects.toThrow(NotFoundException);
      expect(service.create).toHaveBeenCalledWith(createPropriedadeDto);
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
          cultura: 'Soja',
          safra: 2024,
          planted_area_hectares: 150.5,
        },
        {
          cultura: 'Milho',
          safra: 2024,
          planted_area_hectares: 200.0,
        },
      ],
    };

    it('should add culturas to propriedade successfully', async () => {
      const propriedadeId = '123e4567-e89b-12d3-a456-426614174000';
      service.addCulturas.mockResolvedValue(mockCulturas);

      const result = await controller.addCulturas(propriedadeId, addCulturasDto);

      expect(service.addCulturas).toHaveBeenCalledWith(propriedadeId, addCulturasDto);
      expect(result).toEqual(mockCulturas);
    });

    it('should handle service errors when adding culturas', async () => {
      const propriedadeId = 'invalid-id';
      service.addCulturas.mockRejectedValue(new NotFoundException('Propriedade não encontrada'));

      await expect(controller.addCulturas(propriedadeId, addCulturasDto)).rejects.toThrow(NotFoundException);
      expect(service.addCulturas).toHaveBeenCalledWith(propriedadeId, addCulturasDto);
    });
  });

  describe('getCulturas', () => {
    const mockResponse = {
      propriedade_id: '123e4567-e89b-12d3-a456-426614174000',
      propriedade_name: 'Fazenda Boa Vista',
      culturas: [
        {
          id: 'cultura-1',
          cultura: 'Soja',
          safra: 2024,
          planted_area_hectares: 150.5,
          propriedade_id: '123e4567-e89b-12d3-a456-426614174000',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    };

    it('should get culturas from propriedade successfully', async () => {
      const propriedadeId = '123e4567-e89b-12d3-a456-426614174000';
      service.getCulturas.mockResolvedValue(mockResponse);

      const result = await controller.getCulturas(propriedadeId);

      expect(service.getCulturas).toHaveBeenCalledWith(propriedadeId);
      expect(result).toEqual(mockResponse);
    });

    it('should handle service errors when getting culturas', async () => {
      const propriedadeId = 'invalid-id';
      service.getCulturas.mockRejectedValue(new NotFoundException('Propriedade não encontrada'));

      await expect(controller.getCulturas(propriedadeId)).rejects.toThrow(NotFoundException);
      expect(service.getCulturas).toHaveBeenCalledWith(propriedadeId);
    });

    it('should return empty culturas array when propriedade has no culturas', async () => {
      const propriedadeId = '123e4567-e89b-12d3-a456-426614174000';
      const emptyResponse = {
        propriedade_id: propriedadeId,
        propriedade_name: 'Fazenda Boa Vista',
        culturas: [],
      };
      service.getCulturas.mockResolvedValue(emptyResponse);

      const result = await controller.getCulturas(propriedadeId);

      expect(service.getCulturas).toHaveBeenCalledWith(propriedadeId);
      expect(result).toEqual(emptyResponse);
      expect(result.culturas).toHaveLength(0);
    });
  });
});