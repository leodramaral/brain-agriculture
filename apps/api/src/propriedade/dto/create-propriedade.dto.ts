import { IsNotEmpty, IsString, IsNumber, IsUUID, Length, Min, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateAreaSum } from './validators/area-sum.validator';

export class CreatePropriedadeDto {
  @ApiProperty({
    description: 'ID do produtor proprietário da fazenda',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4', { message: 'Produtor ID must be a valid UUID v4' })
  produtor_id: string;

  @ApiProperty({
    description: 'Nome da propriedade rural',
    example: 'Fazenda Boa Vista',
    minLength: 1,
    maxLength: 255
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    description: 'Cidade onde a propriedade está localizada',
    example: 'Ribeirão Preto',
    minLength: 1,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiProperty({
    description: 'Estado onde a propriedade está localizada',
    example: 'SP',
    minLength: 2,
    maxLength: 2
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2, { message: 'State must be exactly 2 characters (state code)' })
  state: string;

  @ApiProperty({
    description: 'Área total da fazenda em hectares',
    example: 1000.5,
    minimum: 0.1
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Total farm area must be a number with maximum 2 decimal places' })
  @IsPositive({ message: 'Total farm area must be positive' })
  @Type(() => Number)
  total_farm_area_hectares: number;

  @ApiProperty({
    description: 'Área agricultável em hectares',
    example: 800.0,
    minimum: 0
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Arable area must be a number with maximum 2 decimal places' })
  @Min(0, { message: 'Arable area must be zero or positive' })
  @Type(() => Number)
  arable_area_hectares: number;

  @ApiProperty({
    description: 'Área de vegetação em hectares',
    example: 200.0,
    minimum: 0
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Vegetation area must be a number with maximum 2 decimal places' })
  @Min(0, { message: 'Vegetation area must be zero or positive' })
  @ValidateAreaSum({ message: 'The sum of arable area and vegetation area cannot exceed the total farm area' })
  @Type(() => Number)
  vegetation_area_hectares: number;
}