import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateProdutorDto {
  @IsNotEmpty()
  @IsString()
  @Length(11, 18)
  @Matches(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/, {
    message: 'Document must be a valid CPF (XXX.XXX.XXX-XX) or CNPJ (XX.XXX.XXX/XXXX-XX)',
  })
  document: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;
}