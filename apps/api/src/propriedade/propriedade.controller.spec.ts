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
});