import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';
import { SHORT_URL_REGEX } from 'src/global/constants';
import { responses } from 'src/global/errors/validation-responses';

class BaseUrlDto {
  @IsNotEmpty({ message: responses.notEmpty })
  @IsString({ message: responses.string })
  @IsUrl(undefined, { message: responses.URL })
  url: string;

  @IsNotEmpty({ message: responses.notEmpty })
  @Matches(SHORT_URL_REGEX, { message: responses.shortURL })
  shortURL: string;
}

export class ShortenURLDto extends PickType(BaseUrlDto, ['url']) {}

export class RedirectByShortURLDto extends PickType(BaseUrlDto, ['shortURL']) {}

export class DeleteUserUrlDto extends PickType(BaseUrlDto, ['shortURL']) {}

export class UpdateShortUrlDto extends BaseUrlDto {}
