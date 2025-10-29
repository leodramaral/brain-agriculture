import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutorService } from './produtor.service';
import { Produtor } from '../entities/produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ProdutorService', () => {
  let service: ProdutorService;
  let repository: Repository<Produtor>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutorService,
        {
          provide: getRepositoryToken(Produtor),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutorService>(ProdutorService);
    repository = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new produtor', async () => {
      const createProdutorDto: CreateProdutorDto = {
        document: '123.456.789-10',
        name: 'João Silva',
      };

      const mockProdutor = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createProdutorDto,
        created_at: new Date(),
        updated_at: new Date(),
        propriedades: [],
      };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(mockProdutor);
      mockRepository.save.mockResolvedValue(mockProdutor);

      const result = await service.create(createProdutorDto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { document: createProdutorDto.document },
      });
      expect(repository.create).toHaveBeenCalledWith(createProdutorDto);
      expect(repository.save).toHaveBeenCalledWith(mockProdutor);
      expect(result).toEqual(mockProdutor);
    });

    it('should throw ConflictException when document already exists', async () => {
      const createProdutorDto: CreateProdutorDto = {
        document: '123.456.789-10',
        name: 'João Silva',
      };

      const existingProdutor = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createProdutorDto,
        created_at: new Date(),
        updated_at: new Date(),
        propriedades: [],
      };

      mockRepository.findOne.mockResolvedValue(existingProdutor);

      await expect(service.create(createProdutorDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of produtores', async () => {
      const mockProdutores = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          document: '123.456.789-10',
          name: 'João Silva',
          created_at: new Date(),
          updated_at: new Date(),
          propriedades: [],
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          document: '98.765.432-10',
          name: 'Maria Santos',
          created_at: new Date(),
          updated_at: new Date(),
          propriedades: [],
        },
      ];

      mockRepository.find.mockResolvedValue(mockProdutores);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: ['propriedades'],
        order: { created_at: 'DESC' },
      });
      expect(result).toEqual(mockProdutores);
    });

    it('should return an empty array when no produtores are found', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: ['propriedades'],
        order: { created_at: 'DESC' },
      });
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a produtor when found', async () => {
      const mockProdutor = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        document: '123.456.789-10',
        name: 'João Silva',
        created_at: new Date(),
        updated_at: new Date(),
        propriedades: [],
      };

      mockRepository.findOne.mockResolvedValue(mockProdutor);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174000');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['propriedades'],
      });
      expect(result).toEqual(mockProdutor);
    });

    it('should throw NotFoundException when produtor is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(
        NotFoundException,
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['propriedades'],
      });
    });
  });
});