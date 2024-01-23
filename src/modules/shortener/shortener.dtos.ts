import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';
import { SHORT_URL_REGEX } from 'src/global/constants';
import { responses } from 'src/global/errors/validation-responses';

class BaseUrlDto {
  @IsNotEmpty({ message: responses.notEmpty })
  @IsString({ message: responses.string })
  @IsUrl(undefined, { message: responses.URL })
  @ApiProperty({ example: 'https://google.com' })
  destinationUrl: string;

  @IsNotEmpty({ message: responses.notEmpty })
  @Matches(SHORT_URL_REGEX, { message: responses.shortUrl })
  @ApiProperty({ example: 'A8CD3F' })
  shortUrlCode: string;
}

export class ShortenUrlDto extends PickType(BaseUrlDto, ['destinationUrl']) {}

export class RedirectByShortUrlCodeDto extends PickType(BaseUrlDto, [
  'shortUrlCode',
]) {}

export class DeleteUserUrlDto extends PickType(BaseUrlDto, ['shortUrlCode']) {}

export class UpdateDestinationUrlDto extends BaseUrlDto {}
