import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorController } from './produtor.controller';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';
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
});