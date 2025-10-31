import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropriedadeController } from './propriedade.controller';
import { PropriedadeService } from './propriedade.service';
import { Propriedade } from '../entities/propriedade.entity';
import { Produtor } from '../entities/produtor.entity';
import { PropriedadeCultura } from '../entities/propriedade-cultura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Propriedade, Produtor, PropriedadeCultura])],
  controllers: [PropriedadeController],
  providers: [PropriedadeService],
  exports: [PropriedadeService],
})
export class PropriedadeModule {}