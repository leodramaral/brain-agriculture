import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorController } from './produtor.controller';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';

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
});