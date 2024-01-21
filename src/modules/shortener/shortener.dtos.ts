import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ShortenURLDto {
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsString({ message: 'Este valor deve ser um TEXTO' })
  @IsUrl(
    {
      protocols: ['http', 'https'],
    },
    {
      message: 'Não é uma URL válida',
    },
  )
  url: string;
}
