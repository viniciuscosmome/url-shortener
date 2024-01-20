import { Controller, Post, Body } from '@nestjs/common';
import { ShortenerRepository } from './shortener.repository';
import { ShortenerService } from './shortener.service';

type ShortenInput = {
  origin: string;
};

@Controller('/short')
export class ShortenerController {
  constructor(
    private shortenerRepository: ShortenerRepository,
    private shortenerService: ShortenerService,
  ) {}

  @Post()
  async shorten(@Body() input: ShortenInput) {
    const id = this.shortenerService.generateId();
    const shortUrlInfo = {
      id: id,
      origin: input.origin,
    };

    await this.shortenerRepository.create(shortUrlInfo);
  }
}
