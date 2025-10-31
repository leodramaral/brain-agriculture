import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ 
    summary: 'Obter estatísticas do dashboard',
    description: 'Retorna dados agregados para o dashboard incluindo total de fazendas, hectares e dados para gráficos'
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas do dashboard retornadas com sucesso',
    type: DashboardStatsDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  async getStats(): Promise<DashboardStatsDto> {
    return this.dashboardService.getDashboardStats();
  }
}