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
    const origin = await this.shortenerRepository.getOriginByURLId(
      params.urlId,
    );

    if (origin) {
      return res.redirect(origin);
    }

    return res.status(404).json({ message: 'Nenhum registro encontrado!' });
  }

  @Post('/url')
  async shorten(@Body() input: ShortenInput) {
    const generated = this.shortenerService.generateURL();

    await this.shortenerRepository.create({
      id: generated.id,
      origin: input.url,
    });

    return {
      message: 'URL encurtada!',
      shortURL: generated.shortURL,
      originalURL: input.url,
    };
  }
}
