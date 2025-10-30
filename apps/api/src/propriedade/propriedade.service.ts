import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propriedade } from '../entities/propriedade.entity';
import { Produtor } from '../entities/produtor.entity';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';

@Injectable()
export class PropriedadeService {
  constructor(
    @InjectRepository(Propriedade)
    private readonly propriedadeRepository: Repository<Propriedade>,
    @InjectRepository(Produtor)
    private readonly produtorRepository: Repository<Produtor>,
  ) {}

  async create(createPropriedadeDto: CreatePropriedadeDto): Promise<Propriedade> {
    const produtor = await this.produtorRepository.findOne({
      where: { id: createPropriedadeDto.produtor_id },
    });

    if (!produtor) {
      throw new NotFoundException('Produtor not found');
    }

    const propriedade = this.propriedadeRepository.create(createPropriedadeDto);
    return await this.propriedadeRepository.save(propriedade);
  }
}