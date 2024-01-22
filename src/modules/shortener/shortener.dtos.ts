import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

class BaseUrlDto {
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

  @Matches(/^[a-zA-Z0-9]{6}$/, {
    message: 'Verifique o formato do link informado.',
  })
  shortURL: string;
}

export class ShortenURLDto extends PickType(BaseUrlDto, ['url']) {}

export class RedirectByShortURLDto extends PickType(BaseUrlDto, ['shortURL']) {}

export class DeleteUserUrlDto extends PickType(BaseUrlDto, ['shortURL']) {}

export class UpdateShortUrlDto extends BaseUrlDto {}
