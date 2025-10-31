import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CulturaPropriedadeDto } from './cultura-propriedade.dto';

export class AddCulturasPropriedadeDto {
  @ApiProperty({
    description: 'Lista de culturas a serem adicionadas à propriedade',
    type: [CulturaPropriedadeDto],
    minItems: 1
  })
  @IsArray({ message: 'Culturas deve ser um array' })
  @ArrayMinSize(1, { message: 'É necessário informar pelo menos uma cultura' })
  @ValidateNested({ each: true })
  @Type(() => CulturaPropriedadeDto)
  culturas: CulturaPropriedadeDto[];
}