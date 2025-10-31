import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutorController } from './produtor.controller';
import { ProdutorService } from './produtor.service';
import { Produtor } from '../entities/produtor.entity';
import { Propriedade } from '../entities/propriedade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor, Propriedade])],
  controllers: [ProdutorController],
  providers: [ProdutorService],
  exports: [ProdutorService],
})
export class ProdutorModule {}