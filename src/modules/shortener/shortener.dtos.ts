import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

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

export class RedirectByShortURLDto {
  @Matches(/^[a-zA-Z0-9]{6}$/, {
    message: 'Verifique o formato do link informado.',
  })
  shortURL: string;
}
