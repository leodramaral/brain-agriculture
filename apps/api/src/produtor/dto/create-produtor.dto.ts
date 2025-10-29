import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutorDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '123.456.789-01',
    pattern: '^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2})$',
    minLength: 11,
    maxLength: 18
  })
  @IsNotEmpty()
  @IsString()
  @Length(11, 18)
  @Matches(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/, {
    message: 'Document must be a valid CPF (XXX.XXX.XXX-XX) or CNPJ (XX.XXX.XXX/XXXX-XX)',
  })
  document: string;

  @ApiProperty({
    description: 'Nome do produtor rural',
    example: 'João Silva',
    minLength: 1,
    maxLength: 255
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;
}