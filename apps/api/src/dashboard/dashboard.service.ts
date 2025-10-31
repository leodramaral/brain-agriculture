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
    const summaryData = await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select([
        'COUNT(propriedade.id) as totalFarms',
        'SUM(propriedade.total_area_hectares) as totalHectares',
      ])
      .getRawOne();

    const stateData = await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select([
        'propriedade.state as state',
        'COUNT(propriedade.id) as count',
      ])
      .groupBy('propriedade.state')
      .orderBy('count', 'DESC')
      .getRawMany();

    const cultureData = await this.propriedadeCulturaRepository
      .createQueryBuilder('propriedadeCultura')
      .select([
        'propriedadeCultura.cultura as cultura',
        'COUNT(propriedadeCultura.id) as count',
      ])
      .leftJoin('propriedadeCultura.propriedade', 'propriedade')
      .groupBy('propriedadeCultura.cultura')
      .orderBy('count', 'DESC')
      .getRawMany();

    const landUseData = await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select([
        'SUM(propriedade.agricultural_area_hectares) as totalAgricultural',
        'SUM(propriedade.vegetation_area_hectares) as totalVegetation',
      ])
      .getRawOne();

    const totalFarms = parseInt(summaryData.totalFarms || '0');
    const totalHectares = parseFloat(summaryData.totalHectares || '0');

    const byState = stateData.map((item) => {
      const value = parseInt(item.count);
      const percentage = totalFarms > 0 ? (value / totalFarms) * 100 : 0;
      return {
        name: item.state,
        value,
        percentage: Math.round(percentage * 100) / 100,
      };
    });

    const totalCultures = cultureData.reduce((sum, item) => sum + parseInt(item.count), 0);
    const byCulture = cultureData.map((item) => {
      const value = parseInt(item.count);
      const percentage = totalCultures > 0 ? (value / totalCultures) * 100 : 0;
      return {
        name: item.cultura,
        value,
        percentage: Math.round(percentage * 100) / 100,
      };
    });

    const totalAgricultural = parseFloat(landUseData.totalAgricultural || '0');
    const totalVegetation = parseFloat(landUseData.totalVegetation || '0');
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
        totalFarms,
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