import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutorService } from './produtor.service';
import { Produtor } from '../entities/produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { ConflictException } from '@nestjs/common';

describe('ProdutorService', () => {
  let service: ProdutorService;
  let repository: Repository<Produtor>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
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
});