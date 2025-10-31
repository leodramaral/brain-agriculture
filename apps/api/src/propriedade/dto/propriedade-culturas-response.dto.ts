import { ApiProperty } from '@nestjs/swagger';
import { PropriedadeCultura } from '../../entities/propriedade-cultura.entity';

export class PropriedadeCulturasResponseDto {
  @ApiProperty({
    description: 'ID da propriedade',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  propriedade_id: string;

  @ApiProperty({
    description: 'Nome da propriedade',
    example: 'Fazenda Boa Vista'
  })
  propriedade_name: string;

  @ApiProperty({
    description: 'Lista de culturas plantadas na propriedade',
    type: [PropriedadeCultura]
  })
  culturas: PropriedadeCultura[];
}