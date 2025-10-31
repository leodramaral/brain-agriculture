import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propriedade } from '../entities/propriedade.entity';
import { PropriedadeCultura } from '../entities/propriedade-cultura.entity';
import { DashboardStatsDto } from './dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Propriedade)
    private readonly propriedadeRepository: Repository<Propriedade>,
    @InjectRepository(PropriedadeCultura)
    private readonly propriedadeCulturaRepository: Repository<PropriedadeCultura>,
  ) {}

  async getDashboardStats(): Promise<DashboardStatsDto> {
    const totalPropriedades = await this.propriedadeRepository.count();
    const totalHectaresResult = await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select('SUM(propriedade.total_area_hectares)', 'sum')
      .getRawOne();
    const totalHectares = parseFloat(totalHectaresResult?.sum || '0');

    const stateData = await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select([
        'propriedade.state as state',
        'COUNT(propriedade.id)::int as count',
      ])
      .groupBy('propriedade.state')
      .orderBy('count', 'DESC')
      .getRawMany();

    const cultureData = await this.propriedadeCulturaRepository
      .createQueryBuilder('propriedadeCultura')
      .select([
        'propriedadeCultura.cultura as name',
        'COUNT(propriedadeCultura.id)::int as count',
      ])
      .leftJoin('propriedadeCultura.propriedade', 'propriedade')
      .groupBy('propriedadeCultura.cultura')
      .orderBy('count', 'DESC')
      .getRawMany();

    const landUseResult = await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select([
        'SUM(propriedade.agricultural_area_hectares) as agricultural',
        'SUM(propriedade.vegetation_area_hectares) as vegetation'
      ])
      .getRawOne();
    
    const totalAgricultural = parseFloat(landUseResult?.agricultural || '0');
    const totalVegetation = parseFloat(landUseResult?.vegetation || '0');

    const byState = stateData.map((item) => {
      const value = item.count;
      const percentage = totalPropriedades > 0 ? (value / totalPropriedades) * 100 : 0;
      return {
        name: item.state,
        value,
        percentage: Math.round(percentage * 100) / 100,
      };
    });

    const totalCultures = cultureData.reduce((sum, item) => sum + item.count, 0);
    const byCulture = cultureData.map((item) => {
      const value = item.count;
      const percentage = totalCultures > 0 ? (value / totalCultures) * 100 : 0;
      return {
        name: item.name,
        value,
        percentage: Math.round(percentage * 100) / 100,
      };
    });

    const landUseTotal = totalAgricultural + totalVegetation;
    const byLandUse = [
      {
        type: 'agricultural',
        hectares: totalAgricultural,
        percentage: landUseTotal > 0 ? Math.round((totalAgricultural / landUseTotal) * 10000) / 100 : 0,
      },
      {
        type: 'vegetation',
        hectares: totalVegetation,
        percentage: landUseTotal > 0 ? Math.round((totalVegetation / landUseTotal) * 10000) / 100 : 0,
      },
    ];

    return {
      summary: {
        totalPropriedades,
        totalHectares,
      },
      charts: {
        byState,
        byCulture,
        byLandUse,
      },
    };
  }
}