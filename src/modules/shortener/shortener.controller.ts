import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ShortenerRepository } from './shortener.repository';
import { ShortenerService } from './shortener.service';
import { ShortenURLDto, RedirectByURLIdDto } from './shortener.dtos';

@Controller()
export class ShortenerController {
  constructor(
    private shortenerRepository: ShortenerRepository,
    private shortenerService: ShortenerService,
  ) {}

  @Get('/:URLId')
  async redirect(@Param() params: RedirectByURLIdDto, @Res() res: Response) {
    const origin = await this.shortenerRepository.getOriginByURLId(
      params.URLId,
    );

    if (origin) {
      return res.redirect(origin);
    }

    return res.status(404).json({ message: 'Nenhum registro encontrado!' });
  }

  @Post('/url')
  async shorten(@Body() input: ShortenURLDto) {
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
