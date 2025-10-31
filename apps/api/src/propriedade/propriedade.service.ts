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

  async addCulturas(propriedadeId: string, addCulturasDto: AddCulturasPropriedadeDto): Promise<any[]> {
    const propriedade = await this.propriedadeRepository.findOne({
      where: { id: propriedadeId },
    });

    if (!propriedade) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    const novasCulturas = addCulturasDto.culturas.map(culturaDto => 
      this.propriedadeCulturaRepository.create({
        cultura: culturaDto.name,
        safra: culturaDto.safra,
        planted_area_hectares: culturaDto.planted_area_hectares,
        propriedade_id: propriedadeId,
      })
    );

    const culturasSalvas = await this.propriedadeCulturaRepository.save(novasCulturas);

    return culturasSalvas.map(cultura => ({
      id: cultura.id,
      name: cultura.cultura,
      safra: cultura.safra,
      planted_area_hectares: cultura.planted_area_hectares,
      created_at: cultura.created_at,
      updated_at: cultura.updated_at,
    }));
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

    const culturasResponse = culturas.map(cultura => ({
      id: cultura.id,
      name: cultura.cultura,
      safra: cultura.safra,
      planted_area_hectares: cultura.planted_area_hectares,
      created_at: cultura.created_at,
      updated_at: cultura.updated_at,
    }));

    return {
      propriedade_id: propriedade.id,
      propriedade_name: propriedade.name,
      culturas: culturasResponse,
    };
  }
}