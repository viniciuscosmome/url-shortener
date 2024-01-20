import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { ShortenerRepository } from './shortener.repository';
import { ShortenerService } from './shortener.service';
import { Response } from 'express';

type ShortenInput = {
  url: string;
};

@Controller()
export class ShortenerController {
  constructor(
    private shortenerRepository: ShortenerRepository,
    private shortenerService: ShortenerService,
  ) {}

  @Get('/:urlId')
  async redirect(@Param() params: { urlId: string }, @Res() res: Response) {
    const id = params.urlId;
    const origin = await this.shortenerRepository.getOriginByUrlId(id);

    if (origin) {
      return res.redirect(origin);
    }

    return res.status(404).json({ message: 'Nenhum registro encontrado!' });
  }

  @Post('/url')
  async shorten(@Body() input: ShortenInput) {
    const id = this.shortenerService.generateId();
    const shortUrlInfo = {
      id: id,
      origin: input.url,
    };

    await this.shortenerRepository.create(shortUrlInfo);

    const shortUrl = `http://localhost:3000/${id}`;

    return {
      message: 'URL encurtada!',
      shortURL: shortUrl,
      originalURL: input.url,
    };
  }
}
