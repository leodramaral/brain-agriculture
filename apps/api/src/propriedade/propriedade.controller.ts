import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { PropriedadeService } from './propriedade.service';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { AddCulturasPropriedadeDto } from './dto/add-culturas-propriedade.dto';
import { PropriedadeCulturasResponseDto } from './dto/propriedade-culturas-response.dto';
import { Propriedade } from '../entities/propriedade.entity';
import { PropriedadeCultura } from '../entities/propriedade-cultura.entity';

@ApiTags('propriedades')
@Controller('propriedades')
export class PropriedadeController {
  constructor(private readonly propriedadeService: PropriedadeService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar nova propriedade',
    description: 'Cria uma nova propriedade rural associada a um produtor existente'
  })
  @ApiBody({ 
    type: CreatePropriedadeDto,
    description: 'Dados da propriedade a ser criada'
  })
  @ApiCreatedResponse({ 
    description: 'Propriedade criada com sucesso',
    type: Propriedade
  })
  @ApiBadRequestResponse({ 
    description: 'Dados inválidos fornecidos'
  })
  @ApiNotFoundResponse({ 
    description: 'Produtor não encontrado'
  })
  async create(@Body() createPropriedadeDto: CreatePropriedadeDto): Promise<Propriedade> {
    return this.propriedadeService.create(createPropriedadeDto);
  }

  @Post(':id/culturas')
  @ApiOperation({ 
    summary: 'Adicionar culturas à propriedade',
    description: 'Adiciona uma ou mais culturas com suas respectivas safras e áreas plantadas a uma propriedade existente'
  })
  @ApiParam({
    name: 'id',
    description: 'ID da propriedade',
    type: 'string',
    format: 'uuid'
  })
  @ApiBody({ 
    type: AddCulturasPropriedadeDto,
    description: 'Lista de culturas a serem adicionadas'
  })
  @ApiCreatedResponse({ 
    description: 'Culturas adicionadas com sucesso',
    type: [PropriedadeCultura]
  })
  @ApiBadRequestResponse({ 
    description: 'Dados inválidos fornecidos'
  })
  @ApiNotFoundResponse({ 
    description: 'Propriedade não encontrada'
  })
  async addCulturas(
    @Param('id') propriedadeId: string,
    @Body() addCulturasDto: AddCulturasPropriedadeDto
  ): Promise<PropriedadeCultura[]> {
    return this.propriedadeService.addCulturas(propriedadeId, addCulturasDto);
  }

  @Get(':id/culturas')
  @ApiOperation({ 
    summary: 'Listar culturas da propriedade',
    description: 'Retorna todas as culturas plantadas em uma propriedade com informações de área e utilização'
  })
  @ApiParam({
    name: 'id',
    description: 'ID da propriedade',
    type: 'string',
    format: 'uuid'
  })
  @ApiOkResponse({ 
    description: 'Lista de culturas retornada com sucesso',
    type: PropriedadeCulturasResponseDto
  })
  @ApiNotFoundResponse({ 
    description: 'Propriedade não encontrada'
  })
  async getCulturas(@Param('id') propriedadeId: string): Promise<PropriedadeCulturasResponseDto> {
    return this.propriedadeService.getCulturas(propriedadeId);
  }
}