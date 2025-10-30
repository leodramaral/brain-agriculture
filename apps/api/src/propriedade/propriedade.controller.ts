import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { PropriedadeService } from './propriedade.service';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { Propriedade } from '../entities/propriedade.entity';

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
}