import { ApiProperty } from '@nestjs/swagger';

export class CulturaResponseDto {
  @ApiProperty({
    description: 'ID da cultura',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    description: 'Nome da cultura plantada',
    example: 'Soja'
  })
  name: string;

  @ApiProperty({
    description: 'Ano da safra',
    example: 2024
  })
  safra: number;

  @ApiProperty({
    description: 'Área plantada em hectares',
    example: 150.75
  })
  planted_area_hectares: number;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-15T10:30:00.000Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-15T10:30:00.000Z'
  })
  updated_at: Date;
}

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
    type: [CulturaResponseDto]
  })
  culturas: CulturaResponseDto[];
}