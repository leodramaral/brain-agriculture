import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propriedade } from '../entities/propriedade.entity';
import { Produtor } from '../entities/produtor.entity';
import { PropriedadeCultura } from '../entities/propriedade-cultura.entity';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { AddCulturasPropriedadeDto } from './dto/add-culturas-propriedade.dto';
import { PropriedadeCulturasResponseDto } from './dto/propriedade-culturas-response.dto';

@Injectable()
export class PropriedadeService {
  constructor(
    @InjectRepository(Propriedade)
    private readonly propriedadeRepository: Repository<Propriedade>,
    @InjectRepository(Produtor)
    private readonly produtorRepository: Repository<Produtor>,
    @InjectRepository(PropriedadeCultura)
    private readonly propriedadeCulturaRepository: Repository<PropriedadeCultura>,
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

  async addCulturas(propriedadeId: string, addCulturasDto: AddCulturasPropriedadeDto): Promise<PropriedadeCultura[]> {
    const propriedade = await this.propriedadeRepository.findOne({
      where: { id: propriedadeId },
    });

    if (!propriedade) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    const novasCulturas = addCulturasDto.culturas.map(culturaDto => 
      this.propriedadeCulturaRepository.create({
        ...culturaDto,
        propriedade_id: propriedadeId,
      })
    );

    return await this.propriedadeCulturaRepository.save(novasCulturas);
  }

  async getCulturas(propriedadeId: string): Promise<PropriedadeCulturasResponseDto> {
    const propriedade = await this.propriedadeRepository.findOne({
      where: { id: propriedadeId },
    });

    if (!propriedade) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    const culturas = await this.propriedadeCulturaRepository.find({
      where: { propriedade_id: propriedadeId },
      order: { safra: 'DESC', cultura: 'ASC' },
    });

    return {
      propriedade_id: propriedade.id,
      propriedade_name: propriedade.name,
      culturas,
    };
  }
}