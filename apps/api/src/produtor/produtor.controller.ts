import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { Produtor } from '../entities/produtor.entity';

@ApiTags('produtores')
@Controller('produtores')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo produtor',
    description: 'Cria um novo produtor rural no sistema com CPF ou CNPJ'
  })
  @ApiBody({ 
    type: CreateProdutorDto,
    description: 'Dados do produtor a ser criado'
  })
  @ApiCreatedResponse({ 
    description: 'Produtor criado com sucesso',
    type: Produtor
  })
  @ApiBadRequestResponse({ 
    description: 'Dados inválidos fornecidos'
  })
  async create(@Body() createProdutorDto: CreateProdutorDto): Promise<Produtor> {
    return this.produtorService.create(createProdutorDto);
  }
}