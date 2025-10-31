import { IsNotEmpty, IsString, IsNumber, IsInt, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CulturaPropriedadeDto {
  @ApiProperty({
    description: 'Nome da cultura plantada',
    example: 'Soja',
    minLength: 1,
    maxLength: 100
  })
  @IsNotEmpty({ message: 'Cultura é obrigatória' })
  @IsString({ message: 'Cultura deve ser uma string' })
  @Length(1, 100, { message: 'Cultura deve ter entre 1 e 100 caracteres' })
  cultura: string;

  @ApiProperty({
    description: 'Ano da safra',
    example: 2024,
    minimum: 1900,
    maximum: 2030
  })
  @IsNotEmpty({ message: 'Safra é obrigatória' })
  @IsInt({ message: 'Safra deve ser um número inteiro' })
  @Min(1900, { message: 'Safra deve ser maior que 1900' })
  @Max(2030, { message: 'Safra deve ser menor que 2030' })
  @Type(() => Number)
  safra: number;

  @ApiProperty({
    description: 'Área plantada em hectares',
    example: 150.75,
    minimum: 0.01
  })
  @IsNotEmpty({ message: 'Área plantada é obrigatória' })
  @IsNumber(
    { maxDecimalPlaces: 2 }, 
    { message: 'Área plantada deve ser um número com máximo 2 casas decimais' }
  )
  @Min(0.01, { message: 'Área plantada deve ser maior que 0' })
  @Type(() => Number)
  planted_area_hectares: number;
}