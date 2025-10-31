import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Propriedade } from '../entities/propriedade.entity';
import { PropriedadeCultura } from '../entities/propriedade-cultura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Propriedade, PropriedadeCultura])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}