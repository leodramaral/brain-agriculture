import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from '../entities/produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';

@Injectable()
export class ProdutorService {
  constructor(
    @InjectRepository(Produtor)
    private readonly produtorRepository: Repository<Produtor>,
  ) {}

  async create(createProdutorDto: CreateProdutorDto): Promise<Produtor> {
    const existingProdutor = await this.produtorRepository.findOne({
      where: { document: createProdutorDto.document },
    });

    if (existingProdutor) {
      throw new ConflictException('Document already exists');
    }

    const produtor = this.produtorRepository.create(createProdutorDto);
    return await this.produtorRepository.save(produtor);
  }

  async findAll(): Promise<Produtor[]> {
    return await this.produtorRepository.find({
      relations: ['propriedades'],
      order: { created_at: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Produtor> {
    const produtor = await this.produtorRepository.findOne({
      where: { id },
      relations: ['propriedades']
    });

    if (!produtor) {
      throw new NotFoundException('Produtor not found');
    }

    return produtor;
  }
}