import { Body, Controller, Post } from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';

@Controller('produtores')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @Post()
  async create(@Body() createProdutorDto: CreateProdutorDto): Promise<Produtor> {
    return this.produtorService.create(createProdutorDto);
  }
}