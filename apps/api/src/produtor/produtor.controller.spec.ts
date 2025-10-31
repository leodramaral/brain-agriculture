import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorController } from './produtor.controller';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';
import { Propriedade } from '../entities/propriedade.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProdutorController', () => {
  let controller: ProdutorController;
  let service: ProdutorService;

  const mockProdutor: Produtor = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    document: '123.456.789-10',
    name: 'João Silva',
    created_at: new Date(),
    updated_at: new Date(),
    propriedades: [],
  };

  const mockProdutorService = {
    create: jest.fn().mockResolvedValue(mockProdutor),
    findAll: jest.fn(),
    findOne: jest.fn(),
    getPropriedades: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutorController],
      providers: [
        {
          provide: ProdutorService,
          useValue: mockProdutorService,
        },
      ],
    }).compile();

    controller = module.get<ProdutorController>(ProdutorController);
    service = module.get<ProdutorService>(ProdutorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new produtor', async () => {
      const createProdutorDto: CreateProdutorDto = {
        document: '123.456.789-10',
        name: 'João Silva',
      };

      const result = await controller.create(createProdutorDto);

      expect(service.create).toHaveBeenCalledWith(createProdutorDto);
      expect(result).toEqual(mockProdutor);
    });
  });

  describe('findAll', () => {
    it('should return an array of produtores', async () => {
      const mockProdutores = [
        mockProdutor,
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          document: '98.765.432-10',
          name: 'Maria Santos',
          created_at: new Date(),
          updated_at: new Date(),
          propriedades: [],
        },
      ];

      mockProdutorService.findAll.mockResolvedValue(mockProdutores);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProdutores);
    });

    it('should return an empty array when no produtores are found', async () => {
      mockProdutorService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a produtor when found', async () => {
      const produtorId = '123e4567-e89b-12d3-a456-426614174000';
      mockProdutorService.findOne.mockResolvedValue(mockProdutor);

      const result = await controller.findOne(produtorId);

      expect(service.findOne).toHaveBeenCalledWith(produtorId);
      expect(result).toEqual(mockProdutor);
    });

    it('should throw NotFoundException when produtor is not found', async () => {
      const produtorId = '123e4567-e89b-12d3-a456-426614174000';
      mockProdutorService.findOne.mockRejectedValue(new NotFoundException('Produtor not found'));

      await expect(controller.findOne(produtorId)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(produtorId);
    });
  });

  describe('getPropriedades', () => {
    const mockPropriedades: Propriedade[] = [
      {
        id: '123e4567-e89b-12d3-a456-426614174100',
        name: 'Fazenda São José',
        city: 'Ribeirão Preto',
        state: 'SP',
        total_area_hectares: 100.50,
        agricultural_area_hectares: 80.00,
        vegetation_area_hectares: 20.50,
        created_at: new Date(),
        updated_at: new Date(),
        produtor_id: '123e4567-e89b-12d3-a456-426614174000',
        produtor: mockProdutor,
        propriedade_cultura: []
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174101',
        name: 'Sítio do Belo Horizonte',
        city: 'Campinas',
        state: 'SP',
        total_area_hectares: 50.25,
        agricultural_area_hectares: 35.00,
        vegetation_area_hectares: 15.25,
        created_at: new Date(),
        updated_at: new Date(),
        produtor_id: '123e4567-e89b-12d3-a456-426614174000',
        produtor: mockProdutor,
        propriedade_cultura: []
      }
    ];

    it('should return all propriedades for a given produtor', async () => {
      const produtorId = '123e4567-e89b-12d3-a456-426614174000';
      mockProdutorService.getPropriedades.mockResolvedValue(mockPropriedades);

      const result = await controller.getPropriedades(produtorId);

      expect(service.getPropriedades).toHaveBeenCalledWith(produtorId);
      expect(result).toEqual(mockPropriedades);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when produtor has no propriedades', async () => {
      const produtorId = '123e4567-e89b-12d3-a456-426614174000';
      mockProdutorService.getPropriedades.mockResolvedValue([]);

      const result = await controller.getPropriedades(produtorId);

      expect(service.getPropriedades).toHaveBeenCalledWith(produtorId);
      expect(result).toEqual([]);
    });

    it('should throw NotFoundException when produtor does not exist', async () => {
      const produtorId = '123e4567-e89b-12d3-a456-426614174999';
      mockProdutorService.getPropriedades.mockRejectedValue(
        new NotFoundException('Produtor not found')
      );

      await expect(controller.getPropriedades(produtorId)).rejects.toThrow(NotFoundException);
      expect(service.getPropriedades).toHaveBeenCalledWith(produtorId);
    });

    it('should handle invalid UUID format gracefully', async () => {
      const invalidId = 'invalid-uuid';
      mockProdutorService.getPropriedades.mockRejectedValue(
        new NotFoundException('Produtor not found')
      );

      await expect(controller.getPropriedades(invalidId)).rejects.toThrow(NotFoundException);
      expect(service.getPropriedades).toHaveBeenCalledWith(invalidId);
    });
  });
});