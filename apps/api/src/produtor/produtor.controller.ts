import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
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

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os produtores',
    description: 'Retorna uma lista com todos os produtores cadastrados no sistema'
  })
  @ApiOkResponse({ 
    description: 'Lista de produtores retornada com sucesso',
    type: [Produtor]
  })
  async findAll(): Promise<Produtor[]> {
    return this.produtorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar produtor por ID',
    description: 'Retorna um produtor específico baseado no ID fornecido'
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do produtor',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid'
  })
  @ApiOkResponse({ 
    description: 'Produtor encontrado com sucesso',
    type: Produtor
  })
  @ApiNotFoundResponse({ 
    description: 'Produtor não encontrado'
  })
  async findOne(@Param('id') id: string): Promise<Produtor> {
    return this.produtorService.findOne(id);
  }
}