import { ApiProperty } from '@nestjs/swagger';

export class DashboardSummaryDto {
  @ApiProperty({ description: 'Total de fazendas cadastradas', example: 150 })
  totalFarms: number;

  @ApiProperty({ description: 'Total de hectares registrados', example: 25680.50 })
  totalHectares: number;
}

export class ChartDataDto {
  @ApiProperty({ description: 'Nome do item (estado ou cultura)', example: 'SP' })
  name: string;

  @ApiProperty({ description: 'Valor absoluto', example: 45 })
  value: number;

  @ApiProperty({ description: 'Percentual do total', example: 30.0 })
  percentage: number;
}

export class LandUseDataDto {
  @ApiProperty({ description: 'Tipo de uso do solo', example: 'agricultural', enum: ['agricultural', 'vegetation'] })
  type: string;

  @ApiProperty({ description: 'Área em hectares', example: 18500.30 })
  hectares: number;

  @ApiProperty({ description: 'Percentual do total', example: 72.0 })
  percentage: number;
}

export class DashboardChartsDto {
  @ApiProperty({ 
    description: 'Distribuição por estado',
    type: [ChartDataDto],
    example: [{ name: 'SP', value: 45, percentage: 30.0 }]
  })
  byState: ChartDataDto[];

  @ApiProperty({ 
    description: 'Distribuição por cultura plantada',
    type: [ChartDataDto],
    example: [{ name: 'Soja', value: 85, percentage: 35.4 }]
  })
  byCulture: ChartDataDto[];

  @ApiProperty({ 
    description: 'Distribuição por uso do solo',
    type: [LandUseDataDto],
    example: [
      { type: 'agricultural', hectares: 18500.30, percentage: 72.0 },
      { type: 'vegetation', hectares: 7180.20, percentage: 28.0 }
    ]
  })
  byLandUse: LandUseDataDto[];
}

export class DashboardStatsDto {
  @ApiProperty({ description: 'Dados resumidos do dashboard', type: DashboardSummaryDto })
  summary: DashboardSummaryDto;

  @ApiProperty({ description: 'Dados para gráficos', type: DashboardChartsDto })
  charts: DashboardChartsDto;
}