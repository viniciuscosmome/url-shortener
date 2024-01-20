import { Controller, Post } from '@nestjs/common';
import { ShortenerRepository } from './shortener.repository';

@Controller('/short')
export class ShortenerController {
  constructor(private shortenerRepository: ShortenerRepository) {}

  @Post()
  async shorten() {
    await this.shortenerRepository.create();
  }
}
